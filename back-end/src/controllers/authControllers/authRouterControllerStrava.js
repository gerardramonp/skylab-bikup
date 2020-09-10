const debug = require('debug')('app:authRouterControllerStrava');

function authRouterControllerStrava(UserModel) {
	function post(req, res) {
		if (req.authUser && req.authMethod) {
			const user = req.authUser;

			// Req.authmethod can be register || login
			if (req.authMethod === 'register') {
				const insertUser = {
					username: user.athlete.username,
					profilePicture: user.athlete.profile,
					stravaUserId: user.athlete.id,
					stravaAccessToken: user.access_token,
					stravaRefreshToken: user.refresh_token,
					stravaTokenExpire: user.expires_at,
				};
				UserModel.create(insertUser, (error, newUser) => {
					if (error) {
						debug(error);
						res.status(400);
						return res.send(error);
					} else {
						user._id = newUser._id;
						res.status(201);
						return res.json(newUser);
					}
				});
			} else {
				// login & update user tokens
				if (req.existingUser) {
					const existingUser = { ...req.existingUser._doc };
					existingUser.stravaAccessToken = user.access_token;
					existingUser.stravaRefreshToken = user.refresh_token;

					const searchQuery = {
						stravaUserId: user.athlete.id,
					};
					const updateQuery = {
						$set: {
							stravaAccessToken: user.access_token,
							stravaRefreshToken: user.refresh_token,
						},
					};

					UserModel.updateOne(
						searchQuery,
						updateQuery,
						(error, updatedUser) => {
							if (error) {
								debug(error);
								res.status(400);
								return res.send(error);
							} else {
								res.status(200);
								return res.json(existingUser);
							}
						}
					);
				} else {
					res.status(400);
					res.send(
						'existinguser is requiered in order to login a user'
					);
				}
			}
		} else {
			res.status(400);
			res.send(
				'authuser & authMetod are requiered in order to register or login a user'
			);
		}
	}

	return { post };
}

module.exports = authRouterControllerStrava;
