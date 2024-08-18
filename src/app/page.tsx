import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ShareForm from '@/components/ShareForm';

export default function Home() {
	return (
		<main className='relative'>
			<Header />
			<h1 className='text-4xl text-center mt-10'>Deliver your secret secretly.</h1>
			<ShareForm />
			<Footer />
		</main>
	);
}
