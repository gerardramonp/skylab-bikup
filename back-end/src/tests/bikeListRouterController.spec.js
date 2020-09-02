const sinon = require('sinon');
const { expect } = require('chai');

const UserModel = require('../models/userModel');
const BikeModel = require('../models/bikeModel');

const bikeListRouterController = require('../controllers/bikeListRouterController')(
    UserModel,
    BikeModel
);

describe('Bike List Router Controller', () => {
    let req = {};
    let res = {};

    afterEach(() => {
        sinon.restore();
    });

    it('Should response with status 400 if no userId', () => {
        req.query = {
            userId: null
        };

        res.status = () => {};
        res.send = () => {};

        const statusSpy = sinon.spy(res, 'status');

        bikeListRouterController.get(req, res);

        expect(statusSpy.calledWith(400)).to.be.true;
    });

    it('Should response with status 400 if no userId', () => {
        req.query = {
            userId: null
        };

        res.status = () => {};
        res.send = () => {};

        const statusSpy = sinon.spy(res, 'status');

        bikeListRouterController.get(req, res);

        expect(statusSpy.calledWith(400)).to.be.true;
    });
});
