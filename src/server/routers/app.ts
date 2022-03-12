import { z } from 'zod';

import { prisma } from '@/server/utils/prisma';
import { getOptionsForVote } from '@/utils/getRandomPet';
import * as trpc from '@trpc/server';

export const appRouter = trpc
	.router()
	.query('get-pet-pair', {
		async resolve() {
			const [first, second] = getOptionsForVote();
			const bothPets = await prisma.pet.findMany({
				where: { id: { in: [first, second] } },
			});

			if (bothPets.length !== 2) throw new Error('Could not find both pets');
			return {
				firstPet: bothPets[0],
				secondPet: bothPets[1],
			};
		},
	})
	.mutation('cast-vote', {
		input: z.object({
			votedForId: z.number(),
			votedAgainstId: z.number(),
		}),
		async resolve({ input }) {
			const voteInDb = await prisma.vote.create({
				data: {
					...input,
				},
			});
			return { success: true, vote: voteInDb };
		},
	});

// export type definition of API
export type AppRouter = typeof appRouter;
