import bikeStore from '../stores/bikeStore';
import dispatcher from '../dispatcher';
import actionTypes from '../actions/actionTypes';
import jest from 'jest';

describe('Bike Store', () => {
    it('Should set a bike and get it', () => {
        const bike = {
            bikeId: '6d4fsd34f5s',
            bikeName: 'myBikeName'
        };
        bikeStore.setBikeDetail(bike);

        const bikeDetail = bikeStore.getBikeDetail();

        expect(bikeDetail).toEqual(bike);
    });

    it('Should log an error when action type is wrong', () => {
        const bikeTestName = 'testName';
        dispatcher.dispatch({
            type: 'undefinedAction',
            data: { bikeName: bikeTestName }
        });

        const bike = bikeStore.getBikeDetail();
        console.log(bike.bikeName);

        expect(bike.bikeName).not.toEqual(bikeTestName);
    });

    it('Should register LOAD_BIKE_BY_ID', () => {
        const bikeTestName = 'testName';
        dispatcher.dispatch({
            type: actionTypes.LOAD_BIKE_BY_ID,
            data: { bikeName: bikeTestName }
        });

        const bike = bikeStore.getBikeDetail();
        console.log(bike.bikeName);

        expect(bike.bikeName).toEqual(bikeTestName);
    });
});
