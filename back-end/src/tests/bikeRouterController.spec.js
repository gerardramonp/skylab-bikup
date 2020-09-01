const sinon = require('sinon');
const { expect } = require('chai');
const BikeModel = require('../models/bikeModel');

const bikeRouterController = require('../controllers/bikeRouterController')(
    BikeModel
);

describe('Bike Router Controller', () => {
    let req = {};
    let res = {};

    afterEach(() => {
        sinon.restore();
    });

    it('[GET] Should call res.json with a bike', () => {
        req;
        res.json = () => {};
        const findFake = sinon.fake.yields(null, 'alex');
        sinon.replace(BikeModel, 'find', findFake);

        const jsonSpy = sinon.spy(res, 'json');

        bikeRouterController.get(req, res);

        expect(jsonSpy.called).to.be.true;
    });
});
