import ShareForm from '@/components/ShareForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Guptachar - Share Secrets Securely',
    description: 'Securely share secrets with end-to-end encryption. Your secrets are safe and confidential.',
	authors: [{name: 'Prasad Karmalkar', url: 'https://github.com/prasadkarmalkar'}],
	keywords: ['Guptachar', 'secret sharing', 'encrypted messages', 'secure communication', 'privacy', 'confidentiality'],
	openGraph: {
		title: 'Guptachar - Share Secrets Securely',
		description: 'Securely share secrets with end-to-end encryption. Your secrets are safe and confidential.',
	}
}

export default function Home() {
	return (
		<main>
			<h1 className='text-4xl text-center mt-10'>Deliver your secret secretly.</h1>
			<ShareForm />
		</main>
	);
}
