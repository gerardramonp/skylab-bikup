const debug = require('debug')('app:authRouterControllerMail');

function authRouterControllerMail(UserModel) {
	function post(req, res) {
		const newUser = req.newUser;

		UserModel.create(newUser, (error, createdUser) => {
			if (error) {
				res.status(400);
				return res.send(error);
			} else {
				res.status(201);
				return res.json(createdUser);
			}
		});
	}

	return { post };
}

module.exports = authRouterControllerMail;
