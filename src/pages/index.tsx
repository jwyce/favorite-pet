import { trpc } from '@/utils/trpc';
import type { NextPage } from 'next';

const Home: NextPage = () => {
	const { data, status } = trpc.useQuery(['hello', { text: 'Jared' }]);

	if (status === 'loading') {
		return <p>Loading...</p>;
	}

	if (data) return <div>{data.greeting}</div>;

	return (
		<div className="h-screen w-screen flex flex-col justify-center items-center">
			<div className="text-2xl text-center">Which Pet do you like more?</div>
			<div className="p-2"></div>
			<div className="border rounded p-8 flex justify-between items-center max-w-2xl">
				<div className="w-16 h-16 bg-red-200"></div>
				<div className="p-8">Vs</div>
				<div className="w-16 h-16 bg-red-200"></div>
			</div>
		</div>
	);
};

export default Home;
