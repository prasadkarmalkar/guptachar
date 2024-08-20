'use server';

import SecretSchema from './lib/SecretSchema';
import crypto from 'crypto';

const algorithm = 'aes-128-cbc';

export async function createSecret(prevState: any, formData: FormData) {
	const secretKey: Buffer = crypto.randomBytes(16); // 16 bytes for AES-128
	const iv: Buffer = crypto.randomBytes(16); // 16 bytes for AES
	const secret = formData.get('secret');
	const expiry = formData.get('expiry');
	const open_expire = formData.get('open-expire');
	let errors = {
		secret: '',
        expiry: '',
        open_expire: '',
		external: ''
	};
	let is_error = false;
	// Check if the secret is empty
	if (!secret) {
		errors.secret = 'Please enter a secret.';
		is_error = true;
	}
	// Check if expiry is provided
	if (!expiry) {
		errors.expiry = 'Please select an expiry time.';
		is_error = true;
	}

	// Convert expiry time to number of seconds
	let expirySeconds = 0;
	switch (expiry) {
		case '1':
			expirySeconds = 60 * 60 * 24; // 1 day
			break;
		case '3':
			expirySeconds = 60 * 60 * 24 * 3; // 3 days
			break;
		case '7':
			expirySeconds = 60 * 60 * 24 * 7; // 1 week
			break;
		default:
			errors.expiry = 'Invalid expiry time.';
			is_error = true;
	}
	if (is_error) {
		return {
			errors: errors,
			success: false,
            data: null,
		};
	}

	const secretHashed = await encrypt(secret, secretKey, iv);
	if (secretHashed) {
		const newSec = new SecretSchema({
			secret: secretHashed.content,
			expireAfter: new Date(Date.now() + expirySeconds * 1000),
			expireOnOpen: open_expire === 'open-expire',
            iv: secretHashed.iv
		});
		const id = await newSec.save();
		return {
			data: {
				id: id._id.toString(),
                secretKey: secretKey.toString('hex')
			},
            errors: errors,
			success: true,
		};
	} else {
        errors.external = 'Error encrypting the secret.';
        return {
            data: null,
            errors: errors,
            success: false,
        }
    }
}

// Encrypt function
export async function encrypt(
	text: FormDataEntryValue | null,
	secretKey: Buffer,
	iv: Buffer
) {
	if (!text) {
		return null;
	}
	const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
	let encrypted = cipher.update(text.toString(), 'utf8', 'hex');
	encrypted += cipher.final('hex');
	return {
		iv: iv.toString('hex'),
		content: encrypted,
	};
}

// Decrypt function
export async function decrypt(hash: string, secretKey: Buffer, iv: string) {
	const decipher = crypto.createDecipheriv(
		algorithm,
		secretKey,
		Buffer.from(iv, 'hex')
	);
	let decrypted = decipher.update(hash, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	return decrypted;
}


export async function getSecret(secretKey: string, id: string) {
    const secret = await SecretSchema.findById(id);
    if (!secret) {
        return {
            error: 'Secret not found.',
            data: null
        }
    }
    if (new Date(secret.expireAfter) < new Date()) {
        return {
            error: 'Secret has expired.',
            data: null
        }
    }
    if (secret.expireOnOpen && secret.isOpened) {
        return {
            error: 'Secret is already opened.',
            data: null
        }
    }

    const decrypted = await decrypt(secret.secret, Buffer.from(secretKey, 'hex'), secret.iv);

    return {
        data: {
            secret: decrypted,
            expireOnOpen: secret.expireOnOpen,
            expireAfter: secret.expireAfter,
            id: secret._id.toString()
        },
        error: null
    }
}

export async function deleteSecret( id: string ) {
    const secret = await SecretSchema.findById(id);
    if (secret && secret.expireOnOpen) {
        secret.isOpened = true;
        await secret.save();
    }
}