const debug = require('debug')('app:bikeListRouterController');

function bikeListRouterController(UserModel, BikeModel) {
    function get(req, res) {
        if (req.query.userId) {
            const query = {
                userId: req.query.userId
            };
            BikeModel.find(query, (error, bikeList) => {
                if (error) {
                    res.status(400);
                    return res.send('userId is required');
                } else {
                    res.status(200);
                    return res.json(bikeList);
                }
            });
        } else {
            res.status(400);
            return res.send('UserId is required');
        }
    }

    return { get };
}

module.exports = bikeListRouterController;
