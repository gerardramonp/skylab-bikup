/* eslint-disable no-underscore-dangle */
const express = require('express');
const debug = require('debug')('app:authRoutes');
const axios = require('axios');
const { ObjectID } = require('mongodb');

const stravaAPI = require('../Constants/stravaAPI');

const authRouterControllerStrava = require('../controllers/authControllers/authRouterControllerStrava');

const authRouter = express.Router();

function routes(UserModel) {
    const stravaController = authRouterControllerStrava(UserModel);

    authRouter.route('/');

    authRouter.route('/check').post((req, res) => {
        const { userId } = req.body;
        const query = {
            _id: new ObjectID(userId)
        };
        UserModel.findOne(query, (error, user) => {
            if (error) {
                res.send(false);
            }
            if (user) {
                res.send(true);
            }
        });
    });

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
                        if (existingUser.length > 0) {
                            req.authUser = {
                                ...stravaUser,
                                _id: existingUser[0]._id
                            };
                            req.authMethod = 'login';
                        } else {
                            req.authUser = { ...stravaUser };
                            req.authMethod = 'register';
                        }

                        next();
                    }
                });
            });
        })
        .post(stravaController.post);

    return authRouter;
}

module.exports = routes;
