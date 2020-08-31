/* eslint-disable no-underscore-dangle */
const express = require('express');
const debug = require('debug')('app:heroRoutes');

const bikesRouterController = require('../controllers/bikesRouterController');

const bikesRouter = express.Router();

function routes() {
	bikesRouter.route('/').get();

	return bikesRouter;
}

module.exports = routes;
