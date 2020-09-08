/* eslint-disable no-underscore-dangle */
const express = require('express');
const debug = require('debug')('app:authRoutes');
const axios = require('axios');
const { ObjectID } = require('mongodb');

const stravaAPI = require('../Constants/stravaAPI');

const authRouterControllerStrava = require('../controllers/authControllers/authRouterControllerStrava');
const authRouterControllerMail = require('../controllers/authControllers/authRouterControllerMail');

const authRouter = express.Router();

function routes(UserModel) {
    const stravaController = authRouterControllerStrava(UserModel);
    const mailController = authRouterControllerMail(UserModel);

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

    authRouter
        .route('/mail')
        .all((req, res, next) => {
            const formData = req.body;

            // Check if user already exist
            const userQuery = {
                email: formData.email
            };
            UserModel.find(userQuery, (error, user) => {
                if (error) {
                    res.status(400);
                    return res.send(error);
                } else {
                    debug(user);
                    if (user.length > 0) {
                        return res.send('Email already registered');
                    } else {
                        const newUser = {
                            email: formData.email,
                            password: formData.password,
                            username: formData.email.split('@')[0]
                        };
                        req.newUser = newUser;
                        next();
                    }
                }
            });
        })
        .post(mailController.post);
    return authRouter;
}

module.exports = routes;
