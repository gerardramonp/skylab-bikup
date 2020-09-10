import React from 'react';
import renderer from 'react-test-renderer';
import BikeDetail from './BikeDetail';
import { BrowserRouter as Router } from 'react-router-dom';
import dispatcher from '../../dispatcher';
import actionTypes from '../../actions/actionTypes';

describe('Bike Detail', () => {
	let tree = null;

	beforeEach(() => {
		tree = renderer.create(
			<Router>
				<BikeDetail />
			</Router>
		);
	});

	it('should match', () => {
		expect(tree.toJSON()).toMatchSnapshot();
	});

	it('Should call onChange function', () => {
		dispatcher.dispatch({
			type: actionTypes.LOAD_BIKE_BY_ID,
			data: 'random',
		});

		expect(tree).toBeTruthy();
	});
});
