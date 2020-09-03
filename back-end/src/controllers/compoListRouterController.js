const debug = require('debug')('app:compoRouterController');
const { ObjectID } = require('mongodb');

function compoListRouterController(CompoModel) {
    function get(req, res) {
        debug('ES FA UNA REQUEST <<<<<<<<<<');
        if (req.query && req.query.compoBikeId) {
            const query = {
                compoBikeId: req.query.compoBikeId
            };

            CompoModel.find(query, (error, compoList) => {
                if (error) {
                    res.status(400);
                    return res.send('compoBikeId is required');
                } else {
                    res.status(200);
                    return res.json(compoList);
                }
            });
        } else {
            res.status(400);
            return res.send('compoBikeId is required');
        }
    }

    return { get };
}

module.exports = compoListRouterController;
