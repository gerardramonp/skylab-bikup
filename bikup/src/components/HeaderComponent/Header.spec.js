import React from 'react';
import renderer from 'react-test-renderer';
import Header from './Header';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Header Component', () => {
	let tree = null;

	beforeEach(() => {
		tree = renderer.create(
			<Router>
				<Header />
			</Router>
		);
	});

	it('should match', () => {
		expect(tree.toJSON()).toMatchSnapshot();
	});
});
