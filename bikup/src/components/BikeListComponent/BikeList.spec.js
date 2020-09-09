import React from 'react';
import renderer from 'react-test-renderer';
import BikeList from './BikeList';
import { BrowserRouter as Router } from 'react-router-dom';
import dispatcher from '../../dispatcher';
import actionTypes from '../../actions/actionTypes';

describe('Bike List Component', () => {
	let tree = null;

	beforeEach(() => {
		tree = renderer.create(
			<Router>
				<BikeList />
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
