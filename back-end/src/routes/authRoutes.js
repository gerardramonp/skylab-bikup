/* eslint-disable no-underscore-dangle */
const express = require('express');
const debug = require('debug')('app:heroRoutes');

const stravaAPI = require('../Constants/stravaAPI');

const authRouter = express.Router();

function routes() {
    // Fer el procés de register amb Strava
    authRouter.route('/');

    return authRouter;
}

module.exports = routes;
