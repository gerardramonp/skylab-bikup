const express = require('express');

const localCrudCompoController = require('../controllers/crudCompoController');

const crudCompoRouter = express.Router();

function routes(BikeModel, CompoModel) {
	const crudCompoController = localCrudCompoController(BikeModel, CompoModel);

	crudCompoRouter.route('/').post(crudCompoController.createCompo);
	crudCompoRouter.route('/reset').put(crudCompoController.resetCompo);

	return crudCompoRouter;
}

module.exports = routes;
