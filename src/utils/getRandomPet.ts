const MAX_PET_ID = 81;

export const getRandomPet = (notThisOne?: number): number => {
	const petNumber = Math.floor(Math.random() * MAX_PET_ID) + 1;
	if (petNumber !== notThisOne) return petNumber;
	return getRandomPet(notThisOne);
};

export const getOptionsForVote = () => {
	const firstId = getRandomPet();
	const secondId = getRandomPet(firstId);

	return [firstId, secondId];
};
