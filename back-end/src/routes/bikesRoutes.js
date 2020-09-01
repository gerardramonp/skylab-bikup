/* eslint-disable no-underscore-dangle */
const express = require('express');
const debug = require('debug')('app:heroRoutes');
const BikeModel = require('../models/bikeModel');

const bikeRouterController = require('../controllers/bikeRouterController');

const bikesRouter = express.Router();

function routes(BikeModel) {
    const controller = bikeRouterController(BikeModel);

    bikesRouter.route('/:bikeId').get(controller.get);

    return bikesRouter;
}

module.exports = routes;
