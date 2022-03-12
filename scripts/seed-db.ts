import { prisma } from '../src/server/utils/prisma';
import { pets } from './pets';

const doBackFill = async () => {
	const creation = await prisma.pet.createMany({ data: pets });
	console.log(creation);
};

doBackFill();
