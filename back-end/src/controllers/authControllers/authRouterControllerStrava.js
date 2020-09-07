const { update } = require('../../models/userModel');

const debug = require('debug')('app:authRouterControllerStrava');

function authRouterControllerStrava(UserModel) {
    function post(req, res) {
        const user = req.authUser;

        // Req.authmethod can be register || login
        if (req.authMethod === 'register') {
            const insertUser = {
                username: user.athlete.username,
                stravaUserId: user.athlete.id,
                stravaAccessToken: user.access_token,
                stravaRefreshToken: user.refresh_token,
                stravaTokenExpire: user.expires_at
            };
            debug('Inserting new user...');
            UserModel.create(insertUser, (error, newUser) => {
                if (error) {
                    debug(error);
                    res.status(400);
                    return res.send(error);
                } else {
                    res.status(201);
                    return res.json(user);
                }
            });
        } else {
            const searchQuery = {
                stravaUserId: user.athlete.id
            };
            const updateQuery = {
                $set: {
                    stravaAccessToken: user.access_token,
                    stravaRefreshToken: user.refresh_token
                }
            };

            debug('updating user....');
            UserModel.updateOne(
                searchQuery,
                updateQuery,
                (error, updatedUser) => {
                    if (error) {
                        debug(error);
                        res.status(400);
                        return res.send(error);
                    } else {
                        debug('User updated: ' + updatedUser);
                        res.status(200);
                        return res.json(user);
                    }
                }
            );
        }
    }

    return { post };
}

module.exports = authRouterControllerStrava;
