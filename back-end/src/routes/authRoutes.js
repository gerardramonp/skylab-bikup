/* eslint-disable no-underscore-dangle */
const express = require('express');
const debug = require('debug')('app:heroRoutes');

const stravaAPI = require('../Constants/stravaAPI');

const authRouter = express.Router();

function routes() {
    authRouter.route('/');

    return authRouter;
}

module.exports = routes;
