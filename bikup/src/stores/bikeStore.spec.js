import bikeStore from '../stores/bikeStore';

describe('Bike Store', () => {
	it('Should set a bike and get it', () => {
		const bike = {
			bikeId: '6d4fsd34f5s',
			bikeName: 'myBikeName',
		};
		bikeStore.setBikeDetail(bike);

		const bikeDetail = bikeStore.getBikeDetail();

		expect(bikeDetail).toEqual(bike);
	});
});
