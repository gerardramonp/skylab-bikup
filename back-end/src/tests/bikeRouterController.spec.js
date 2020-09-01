const sinon = require('sinon');
const { expect } = require('chai');

const bikeRouterController = require('../controllers/bikeRouterController');

describe('Bike Router Controller', () => {
    let req = {};
    let res = {};

    afterEach(() => {
        sinon.restore();
    });

    it('[GET] Should call res.json with a bike', () => {
        res = {
            json: () => {}
        };

        const jsonSpy = sinon.spy(res, 'json');

        bikeRouterController.get(req, res);

        expect(jsonSpy.called).to.be.true;
    });
});
