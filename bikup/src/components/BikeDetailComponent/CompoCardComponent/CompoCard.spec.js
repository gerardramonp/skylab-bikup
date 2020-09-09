import React from 'react';
import renderer from 'react-test-renderer';
import CompoCard from './CompoCard';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Compo Card', () => {
	let tree = null;

	let compoInfo = {
		compoDisplayName: '',
		compoAccumulatedMeters: 10,
		compoLife: 1,
	};
	const bikeName = 'alma';

	beforeEach(() => {
		tree = renderer.create(
			<Router>
				<CompoCard compoInfo={compoInfo} bikeName={bikeName} />
			</Router>
		);
	});

	it('should match', () => {
		expect(tree.toJSON()).toMatchSnapshot();
	});

	it('Should execute function callback when clicking', () => {
		console.log(tree.find('button'));
	});
});
