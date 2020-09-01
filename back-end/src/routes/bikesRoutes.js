/* eslint-disable no-underscore-dangle */
const express = require('express');
const debug = require('debug')('app:heroRoutes');

const bikeRouterController = require('../controllers/bikeRouterController');
const bikeListRouterController = require('../controllers/bikeListRouterController');

const bikesRouter = express.Router();

function routes(UserModel, BikeModel) {
    const bikeController = bikeRouterController(BikeModel);
    const bikeListController = bikeListRouterController(UserModel, BikeModel);

    bikesRouter.route('/').get(bikeListController.get);

    bikesRouter.route('/:bikeId').get(bikeController.get);

    return bikesRouter;
}

module.exports = routes;
