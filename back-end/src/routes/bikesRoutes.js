/* eslint-disable no-underscore-dangle */
const express = require('express');
const debug = require('debug')('app:heroRoutes');

const bikesRouterController = require('../controllers/bikeRouterController');

const bikesRouter = express.Router();

function routes() {
	bikesRouter.route('/').get();

	bikesRouter.route('/:bikeId').get(bikesRouterController.get);

	return bikesRouter;
}

module.exports = routes;
