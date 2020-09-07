/* eslint-disable no-underscore-dangle */
const express = require('express');
const debug = require('debug')('app:authRoutes');
const axios = require('axios');

const stravaAPI = require('../Constants/stravaAPI');

const authRouterControllerStrava = require('../controllers/authControllers/authRouterControllerStrava');

const authRouter = express.Router();

function routes(UserModel) {
    const stravaController = authRouterControllerStrava(UserModel);

    authRouter.route('/');
    authRouter
        .route('/strava')
        .all((req, res, next) => {
            const { authCode } = req.body;
            const tokenEndPoint = `https://www.strava.com/oauth/token?client_id=${stravaAPI.CLIENT_ID}&client_secret=${stravaAPI.CLIENT_SECRET}&code=${authCode}&grant_type=authorization_code`;
            axios.post(tokenEndPoint).then((response) => {
                const stravaUser = response.data;
                const userQuery = {
                    stravaUserId: stravaUser.athlete.id
                };
                UserModel.find(userQuery, (error, existingUser) => {
                    if (error) {
                        debug(error);
                        return res.send(error);
                    } else {
                        req.authUser = {
                            ...stravaUser,
                            _id: existingUser[0]._id
                        };
                        debug(req.authUser);
                        existingUser.length > 0
                            ? (req.authMethod = 'login')
                            : (req.authMethod = 'register');
                        next();
                    }
                });
            });
        })
        .post(stravaController.post);

    return authRouter;
}

module.exports = routes;
