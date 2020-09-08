const debug = require('debug')('app:authRouterControllerMail');

function authRouterControllerStrava(UserModel) {
    function post(req, res) {
        const newUser = req.newUser;

        UserModel.create(newUser, (error, createdUser) => {
            if (error) {
                res.status(400);
                return res.send(error);
            } else {
                debug('created user... ');
                res.status(201);
                return res.json(createdUser);
            }
        });
    }

    return { post };
}

module.exports = authRouterControllerStrava;
