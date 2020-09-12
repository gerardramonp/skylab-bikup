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
	crudBikeRouter.route('/delete').put(crudBikeController.put);
	crudBikeRouter.route('/edit').put(crudBikeController.patch);

	return crudBikeRouter;
}

module.exports = routes;
