import React from 'react';
import renderer from 'react-test-renderer';
import Landing from './Landing';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Landing Component', () => {
	let tree = null;

	beforeEach(() => {
		tree = renderer.create(
			<Router>
				<Landing />
			</Router>
		);
	});

	it('should match', () => {
		expect(tree.toJSON()).toMatchSnapshot();
	});
});
