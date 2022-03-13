import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import { PetListing } from '@/components/PetListing';
import { trpc } from '@/utils/trpc';

import type { NextPage } from 'next';
const Home: NextPage = () => {
	const {
		data: petPair,
		refetch,
		status,
	} = trpc.useQuery(['get-pet-pair'], {
		refetchInterval: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});

	const voteMutation = trpc.useMutation(['cast-vote']);

	const votForFavorite = (selected: number) => {
		if (!petPair) return;

		if (selected === petPair.firstPet.id) {
			voteMutation.mutate({
				votedForId: petPair.firstPet.id,
				votedAgainstId: petPair.secondPet.id,
			});
		} else {
			voteMutation.mutate({
				votedForId: petPair.secondPet.id,
				votedAgainstId: petPair.firstPet.id,
			});
		}
		refetch();
	};

	const fetchingNext = voteMutation.isLoading || status === 'loading';

	return (
		<div className="h-screen w-screen flex flex-col py-5 justify-between items-center relative">
			<Head>
				<title>Favorite Pet</title>
			</Head>
			<div className="text-2xl text-center font-bold">Which Pet is Better?</div>
			{petPair && !fetchingNext && (
				<div className="my-8 flex justify-between items-center max-w-2xl flex-col md:flex-row animate-fade-in">
					<PetListing
						pet={petPair.firstPet}
						vote={() => votForFavorite(petPair.firstPet.id)}
						disabled={fetchingNext}
					/>
					<div className="m-8 italic text-xl">or</div>
					<PetListing
						pet={petPair.secondPet}
						vote={() => votForFavorite(petPair.secondPet.id)}
						disabled={fetchingNext}
					/>
				</div>
			)}
			{(!petPair || fetchingNext) && <img src="/rings.svg" className="w-48" />}
			<div className="w-full text-xl text-center pb-2">
				<a href="https://github.com/jwyce">GitHub</a>
				<span className="my-4">{' - '}</span>
				<Link href="/results">
					<a>Results</a>
				</Link>
			</div>
		</div>
	);
};

export default Home;
