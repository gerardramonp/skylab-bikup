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

    it('[GET] Should return status 400 if no bikeId is passed in req', () => {
        req.params = {};
        res.json = () => {};
        res.status = () => {};
        res.send = () => {};

        const statusSpy = sinon.spy(res, 'status');

        bikeRouterController.get(req, res);

        expect(statusSpy.calledWith(400)).to.be.true;
    });

    it('[GET] Should send status 400 if find throws an error', () => {
        req.params = { bikeId: '5f4e48d27edd9832f01d6cc4' };
        res.json = () => {};
        res.status = () => {};
        res.send = () => {};

        const findFake = sinon.fake.yields(true, 'alex');
        sinon.replace(BikeModel, 'find', findFake);

        const statusSpy = sinon.spy(res, 'status');

        bikeRouterController.get(req, res);

        expect(statusSpy.calledWith(400)).to.be.true;
    });

    it('[GET] Should call res.json with a bike', () => {
        req.params = { bikeId: '5f4e48d27edd9832f01d6cc4' };
        res.json = () => {};
        res.status = () => {};
        res.send = () => {};
        const findFake = sinon.fake.yields(null, 'alex');
        sinon.replace(BikeModel, 'find', findFake);

        const jsonSpy = sinon.spy(res, 'json');

        bikeRouterController.get(req, res);

        expect(jsonSpy.called).to.be.true;
    });
});
