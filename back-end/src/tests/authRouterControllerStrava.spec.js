const sinon = require('sinon');
const { expect } = require('chai');

const UserModel = require('../models/userModel');

const authRouterControllerStrava = require('../controllers/authControllers/authRouterControllerStrava')(
	UserModel
);

describe('Auth Router Mail Controller', () => {
	let req = {};
	let res = {};
	let statusSpy = null;
	let jsonSpy = null;

	beforeEach(() => {
		req.params = {};
		req.query = {};
		res.json = () => {};
		res.status = () => {};
		res.send = () => {};

		statusSpy = sinon.spy(res, 'status');
		jsonSpy = sinon.spy(res, 'json');
	});

	afterEach(() => {
		sinon.restore();
	});

	it('Should res.status 400 when no authUser or authMethod are passed', () => {
		req.authUser = null;

		authRouterControllerStrava.post(req, res);

		expect(statusSpy.calledWith(400)).to.be.true;
	});

	it('[REGISTER] Should res.status 400 when create throws error', () => {
		const user = {
			access_token: '34gj5gj',
			refresh_token: '34gj5gj',
			expires_at: 32445,
			athlete: {
				username: '45435',
				profile: 'http://image.com',
				id: 555345,
			},
		};

		req.authUser = user;
		req.authMethod = 'register';

		const userCreateFake = sinon.fake.yields(true, 'createdUser');
		sinon.replace(UserModel, 'create', userCreateFake);

		authRouterControllerStrava.post(req, res);

		expect(statusSpy.calledWith(400)).to.be.true;
	});

	it('[REGISTER] Should res.status 201 when creating an user', () => {
		const user = {
			access_token: '34gj5gj',
			refresh_token: '34gj5gj',
			expires_at: 32445,
			athlete: {
				username: '45435',
				profile: 'http://image.com',
				id: 555345,
			},
		};

		req.authUser = user;
		req.authMethod = 'register';

		const userCreateFake = sinon.fake.yields(false, 'createdUser');
		sinon.replace(UserModel, 'create', userCreateFake);

		authRouterControllerStrava.post(req, res);

		expect(statusSpy.calledWith(201)).to.be.true;
	});

	it('[LOGIN] Should res.status 400 when no existingUser is passed', () => {
		const user = {
			access_token: '34gj5gj',
			refresh_token: '34gj5gj',
			expires_at: 32445,
			athlete: {
				username: '45435',
				profile: 'http://image.com',
				id: 555345,
			},
		};

		req.authUser = user;
		req.authMethod = 'login';

		req.existingUser = null;

		authRouterControllerStrava.post(req, res);

		expect(statusSpy.calledWith(400)).to.be.true;
	});

	it('[LOGIN] Should res.status 400 when update throws error', () => {
		const user = {
			access_token: '34gj5gj',
			refresh_token: '34gj5gj',
			athlete: {
				id: 555345,
			},
		};

		req.authUser = user;
		req.authMethod = 'login';

		req.existingUser = {
			_doc: {
				stravaAccessToken: null,
				stravaRefreshToken: null,
			},
		};

		const userUpdateFake = sinon.fake.yields(true, 'updatedUser');
		sinon.replace(UserModel, 'updateOne', userUpdateFake);

		authRouterControllerStrava.post(req, res);

		expect(statusSpy.calledWith(400)).to.be.true;
	});

	it('[LOGIN] Should res.status 200 when updating a user', () => {
		const user = {
			access_token: '34gj5gj',
			refresh_token: '34gj5gj',
			athlete: {
				id: 555345,
			},
		};

		req.authUser = user;
		req.authMethod = 'login';

		req.existingUser = {
			_doc: {
				stravaAccessToken: null,
				stravaRefreshToken: null,
			},
		};

		const userUpdateFake = sinon.fake.yields(false, 'updatedUser');
		sinon.replace(UserModel, 'updateOne', userUpdateFake);

		authRouterControllerStrava.post(req, res);

		expect(statusSpy.calledWith(200)).to.be.true;
	});
});
