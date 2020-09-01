const debug = require('debug')('app:bikesRouterController');
const { ObjectID } = require('mongodb');

function bikeRouterController(Model) {
    function get(req, res) {
        if (req.params.bikeId) {
            const query = {
                _id: new ObjectID(req.params.bikeId)
            };

            Model.find(query, (error, bike) => {
                if (error) {
                    res.status(400);
                    return res.send('BikeId is required');
                } else {
                    res.status(200);
                    return res.json(bike);
                }
            });
        } else {
            res.status(400);
            return res.send('BikeId is required');
        }
    }

    return { get };
}

module.exports = bikeRouterController;
