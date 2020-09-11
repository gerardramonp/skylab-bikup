const express = require('express');
const debug = require('debug')('app:crudBikeRoutes');

const crudBikeController = require('../controllers/crudBikeController');

const crudBikeRouter = express.Router();

function routes(UserModel, BikeModel, CompoModel) {
	const crudBikeController = crudBikeController(
		UserModel,
		BikeModel,
		CompoModel
	);

	crudBikeRouter.route('/').post(crudBikeController.post);
}
