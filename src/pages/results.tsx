import Head from 'next/head';

import { PetRankListing } from '@/components/PetRankListing';
import { prisma } from '@/server/utils/prisma';
import { AsyncReturnType } from '@/utils/ts-bs';

import type { GetServerSideProps } from 'next';
const getPetsInOrder = async () => {
	return await prisma.pet.findMany({
		orderBy: {
			VoteFor: { _count: 'desc' },
		},
		select: {
			id: true,
			name: true,
			spriteUrl: true,
			_count: {
				select: {
					VoteFor: true,
					VoteAgainst: true,
				},
			},
		},
	});
};

export type PetQueryResult = AsyncReturnType<typeof getPetsInOrder>;
export const generateCountPercent = (pet: PetQueryResult[number]) => {
	const { VoteFor, VoteAgainst } = pet._count;
	if (VoteFor + VoteAgainst === 0) {
		return 0;
	}
	return (VoteFor / (VoteFor + VoteAgainst)) * 100;
};

const ResultsPage: React.FC<{
	pets: PetQueryResult;
}> = ({ pets }) => {
	return (
		<div className="flex flex-col items-center">
			<Head>
				<title>Pet Rankings</title>
			</Head>
			<h2 className="text-2xl font-bold p-4">Rankings</h2>
			<div className="flex flex-col w-full max-w-2xl border">
				{pets
					.sort((a: PetQueryResult[number], b: PetQueryResult[number]) => {
						const difference =
							generateCountPercent(b) - generateCountPercent(a);

						if (difference === 0) {
							return b._count.VoteFor - a._count.VoteFor;
						}

						return difference;
					})
					.map((currentPet: PetQueryResult[number], index: number) => {
						return (
							<PetRankListing pet={currentPet} key={index} rank={index + 1} />
						);
					})}
			</div>
		</div>
	);
};

export default ResultsPage;

export const getStaticProps: GetServerSideProps = async () => {
	const petsOrdered = await getPetsInOrder();
	const DAY_IN_SECONDS = 60 * 60 * 24;
	return { props: { pets: petsOrdered }, revalidate: DAY_IN_SECONDS };
};
