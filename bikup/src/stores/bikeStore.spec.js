import bikeStore from '../../stores/bikeStore';

describe('Bike Store', () => {
	it('Should get a bike when calling getBikeDetail ', () => {
		const bike = {
			bikeId: '6d4fsd34f5s',
			bikeName: 'myBikeName',
		};
		bikeStore.setbikeDetail(bike);

		const bikeDetail = bikestore.getBikeDetail();

		expect(bikeDetail).toEqual(bike);
	});
});
