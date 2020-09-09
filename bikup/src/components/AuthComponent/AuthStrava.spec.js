import React from 'react';
import renderer from 'react-test-renderer';
import AuthStrava from './AuthStrava';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import dispatcher from '../../dispatcher';
import authStore from '../../stores/bikeStore';
import actionTypes from '../../actions/actionTypes';

describe('Auth Strava Component', () => {
	let tree = null;

	beforeEach(() => {
		tree = renderer.create(
			<Router>
				<AuthStrava />
			</Router>
		);
	});

	it('Should match snapshot', () => {
		tree = renderer.create(
			<Router>
				<AuthStrava />
			</Router>
		);
		expect(tree.toJSON()).toMatchSnapshot();
	});

	it('Should execute on change', () => {
		dispatcher.dispatch({
			type: actionTypes.LOGIN_USER_STRAVA,
			data: { user: true },
		});
		expect(tree).toBeTruthy();
	});
});
