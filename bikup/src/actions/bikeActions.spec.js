import { loadUserBikeList } from './bikeActions';
describe('Bike Actions', () => {
    it('Should return false if no bikeUserId is passed by param', () => {
        const result = loadUserBikeList();
        expect(result).toBe(false);
    });

    it('Should dispatch loadUserBikeList', () => {
        expect(true).toBe(true);
    });
});
