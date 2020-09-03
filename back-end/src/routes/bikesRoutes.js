/* eslint-disable no-underscore-dangle */
const express = require('express');
const debug = require('debug')('app:heroRoutes');

const bikeRouterController = require('../controllers/bikeRouterController');
const bikeListRouterController = require('../controllers/bikeListRouterController');
const compoListRouterController = require('../controllers/compoListRouterController');

const bikesRouter = express.Router();

function routes(UserModel, BikeModel, CompoModel) {
    const bikeController = bikeRouterController(BikeModel);
    const bikeListController = bikeListRouterController(
        UserModel,
        BikeModel,
        CompoModel
    );
    // const compoListController = compoListRouterController(CompoModel);

    bikesRouter.route('/').get(bikeListController.get);

    bikesRouter.route('/:bikeId').get(bikeController.get);

    // bikesRouter.route('/:bikeId/components').get(compoListController.get);

    return bikesRouter;
}

module.exports = routes;
