import React from 'react';
import renderer from 'react-test-renderer';
import BikeCard from './BikeCard';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Bike Card Component', () => {
	let tree = null;

	const bikeInfo = {
		bikeName: 'eo',
		bikeTotalMeters: 100,
		bikeLikes: 4,
	};

	beforeEach(() => {
		tree = renderer.create(
			<Router>
				<BikeCard bikeInfo={bikeInfo} />
			</Router>
		);
	});

	it('should match', () => {
		expect(tree.toJSON()).toMatchSnapshot();
	});
});
