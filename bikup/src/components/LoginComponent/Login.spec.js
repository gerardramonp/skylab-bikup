import React from 'react';
import renderer from 'react-test-renderer';
import Login from './Login';
import { BrowserRouter as Router } from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe('Login Component', () => {
	let tree = null;
	let compo = null;
	let mountedCompo = null;

	beforeEach(() => {
		tree = renderer.create(
			<Router>
				<Login />
			</Router>
		);
	});

	it('should match', () => {
		expect(tree.toJSON()).toMatchSnapshot();
	});

	it('should find button', () => {
		const page = shallow(<Login />);
		const button = page.find('.login__submitbutton');
		button.simulate('click', { preventDefault: () => {} });
		expect(button.length).toBe(1);
	});
});
