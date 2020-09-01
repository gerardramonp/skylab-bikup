const debug = require('debug')('app:bikesRouterController');
const bike = require('../../public/mocks/bikeMock.json');

const get = (req, res) => {
	res.json(bike);
};

module.exports = { get };
