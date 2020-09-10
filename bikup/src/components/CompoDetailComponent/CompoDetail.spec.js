import React from 'react';
import renderer from 'react-test-renderer';
import CompoDetail from './CompoDetail';
import { BrowserRouter as Router } from 'react-router-dom';
import dispatcher from '../../dispatcher';
import actionTypes from '../../actions/actionTypes';

describe('CompoDetail Component', () => {
	let tree = null;

	beforeEach(() => {
		tree = renderer.create(
			<Router>
				<CompoDetail props={'hola'} />
			</Router>
		);
	});

	it('should match', () => {
		tree = renderer.create(
			<Router>
				<CompoDetail props={'hola'} />
			</Router>
		);
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
