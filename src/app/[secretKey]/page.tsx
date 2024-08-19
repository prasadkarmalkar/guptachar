'use client';
import React, { useEffect, useState } from 'react';
import { getSecret } from '../actions';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Define the type for your state
type SecretDataState =
	| { error: string; data: null }
	| {
			data: { secret: string; expireOnOpen: any; expireAfter: any };
			error: null;
	  };

function Page({ params }: { params: { secretKey: string } }) {
	const searchParams = useSearchParams();
	const [secretData, setSecretData] = useState<SecretDataState | null>(null);

	useEffect(() => {
		async function initialSetData() {
			const idObject = searchParams.get('id');
			const id = idObject ? idObject : '';
			const decryptedSecret = await getSecret(params.secretKey, id);
			setSecretData(decryptedSecret);
		}
		// Call the async function inside useEffect
		initialSetData();
	}, [searchParams, params.secretKey]); // Add dependencies to the dependency array

	return (
		<main>
			<h1 className='text-4xl text-center mt-10'>Here is your secret</h1>
			<div className='m-auto text-center mt-10 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl px-2 md:px-4 lg:px-8 pb-36'>

				{secretData?.error ? (
					<p className='text-red-500 text-center text-lg'>{secretData?.error}</p>
				) : 
                <>
                <textarea
					className='w-full outline-gray-500 outline-1 p-2 rounded-md bg-black border-gray-700 border'
					name='secret'
					id='secret'
					rows={5}
					required
                    disabled
                    value={secretData?.data?.secret}
				/>
                <div className='text-center mt-5 border-gray-700 border rounded-md px-4 py-2'>
                {secretData?.data?.expireOnOpen ? `Copy the secret, Its deleted from server!` : `Secret will be deleted on ${new Date(secretData?.data?.expireAfter).toLocaleString()}`}
                </div>
                </>}
                <Link href='/' className='inline-block mt-10 rounded-md border bg-gray-900 border-gray-700 px-5 py-2 hover:cursor-pointer hover:bg-black'>Create new secret</Link>
			</div>
		</main>
	);
}

export default Page;
