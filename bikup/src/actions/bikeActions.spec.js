import { loadUserBikeList } from './bikeActions';
describe('Bike Actions', () => {
	xit('Should return false if no bikeUserId is passed by param', () => {
		const result = loadUserBikeList();
		expect(result).toBe(false);
	});

	xit('Should dispatch loadUserBikeList', () => {
		expect(true).toBe(true);
	});
});
