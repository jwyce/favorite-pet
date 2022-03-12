import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@/server/utils/prisma';

export const appRouter = trpc
	.router()
	.query('hello', {
		input: z
			.object({
				text: z.string().nullish(),
			})
			.nullish(),
		resolve({ input }) {
			return {
				greeting: `hello ${input?.text ?? 'world'}`,
			};
		},
	})
	.mutation('cast-vote', {
		input: z.object({
			votedFor: z.number(),
			votedAgainst: z.number(),
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
