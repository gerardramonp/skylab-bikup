import React from 'react';
import renderer from 'react-test-renderer';
import BikeDetail from './BikeDetail';
import { BrowserRouter as Router } from 'react-router-dom';
import dispatcher from '../../dispatcher';
import bikeStore from '../../stores/bikeStore';
import actionTypes from '../../actions/actionTypes';

describe('Bike Detail', () => {
	xit('should match', () => {
		let tree = renderer.create(
			<Router>
				<BikeDetail />
			</Router>
		);
		expect(tree.toJSON()).toMatchSnapshot();
	});

	xit('should load bike list', () => {
		const bikeTestName = 'testName';
		dispatcher.dispatch({
			type: actionTypes.LOAD_BIKE_BY_ID,
			data: { bikeName: bikeTestName },
		});

		const bike = bikeStore.getBikeDetail();

		expect(bike.bikeName).toEqual(bikeTestName);
	});
});
