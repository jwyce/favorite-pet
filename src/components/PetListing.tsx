import Image from 'next/image';
import React from 'react';

import { inferQueryResponse } from '@/pages/api/trpc/[trpc]';

type PetFromServer = inferQueryResponse<'get-pet-pair'>['firstPet'];
interface PetListingProps {
	pet: PetFromServer;
	vote: () => void;
	disabled: boolean;
}

export const PetListing: React.FC<PetListingProps> = ({
	pet,
	vote,
	disabled,
}) => {
	return (
		<div
			className={`flex flex-col items-center transition-opacity bg-gray-900 rounded-lg ${
				disabled && 'opacity-0'
			}`}
			key={pet.id}
		>
			<div
				className="rounded-t-lg opacity-50 transition-opacity hover:opacity-100"
				style={{
					backgroundImage:
						'url(https://superauto.pet/assets/battleback1-2.webp)',
				}}
			>
				<Image
					src={pet.spriteUrl}
					width={256}
					height={256}
					priority
					layout="fixed"
					className={`animate-fade-in transition-transform  scale-75 hover:scale-95 ${
						disabled ? 'cursor-not-allowed' : 'cursor-pointer'
					}`}
					onClick={() => {
						if (!disabled) {
							vote();
						}
					}}
				/>
			</div>
			<div className="text-xl text-center capitalize mb-[0.5rem] font-bold">
				{pet.name}
			</div>
		</div>
	);
};
