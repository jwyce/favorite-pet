import Image from 'next/image';
import React from 'react';

import { generateCountPercent, PetQueryResult } from '@/pages/results';

interface PetRankListingProps {
	pet: PetQueryResult[number];
	rank: number;
}

export const PetRankListing: React.FC<PetRankListingProps> = ({
	pet,
	rank,
}) => {
	return (
		<div className="relative flex border-b p-2 items-center justify-between">
			<div className="flex items-center">
				<div className="flex items-center pl-4">
					<Image src={pet.spriteUrl} width={64} height={64} layout="fixed" />
					<div className="pl-2 capitalize">{pet.name}</div>
				</div>
			</div>
			<div className="pr-4">{generateCountPercent(pet).toFixed(2) + '%'}</div>
			<div className="absolute top-0 left-0 z-20 flex items-center justify-center px-2 font-semibold text-white bg-gray-600 border border-gray-500 shadow-lg rounded-br-md">
				{rank}
			</div>
		</div>
	);
};
