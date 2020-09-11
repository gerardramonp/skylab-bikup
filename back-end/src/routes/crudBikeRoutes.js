const express = require('express');
const debug = require('debug')('app:crudBikeRoutes');

const localCrudBikeController = require('../controllers/crudBikeController');

const crudBikeRouter = express.Router();

function routes(UserModel, BikeModel, CompoModel) {
	const crudBikeController = localCrudBikeController(
		UserModel,
		BikeModel,
		CompoModel
	);

	crudBikeRouter.route('/').post(crudBikeController.post);

	return crudBikeRouter;
}

module.exports = routes;
