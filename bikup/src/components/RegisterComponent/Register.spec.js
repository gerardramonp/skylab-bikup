import React from 'react';
import renderer from 'react-test-renderer';
import Register from './Register';
import { BrowserRouter as Router } from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import dispatcher from '../../dispatcher';
import actionTypes from '../../actions/actionTypes';

Enzyme.configure({ adapter: new Adapter() });

describe('Profile Component', () => {
	let tree = null;
	let compo = null;
	let mountedCompo = null;

	beforeEach(() => {
		tree = renderer.create(
			<Router>
				<Register />
			</Router>
		);
	});

	it('should match', () => {
		dispatcher.dispatch({
			type: actionTypes.LOGIN_USER_STRAVA,
			data: true,
		});
		expect(tree.toJSON()).toMatchSnapshot();
	});

	it('should find button', () => {
		const page = shallow(<Register />);
		const button = page.find('.form-register__button');
		button.simulate('click', { preventDefault: () => {} });
		expect(button.length).toBe(1);
	});
});
