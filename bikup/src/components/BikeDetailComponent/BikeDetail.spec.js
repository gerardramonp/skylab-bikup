import React from 'react';
import renderer from 'react-test-renderer';
import BikeDetail from './BikeDetail';
import { BrowserRouter as Router } from 'react-router-dom';
import dispatcher from '../../dispatcher';
import bikeStore from '../../stores/bikeStore';
import actionTypes from '../../actions/actionTypes';

describe('RepoCard snapshot', () => {
    let match = {};
    let tree = null;
    beforeEach(() => {
        match = {
            params: {
                bikeId: 'someBikeId'
            }
        };

        tree = renderer.create(
            <Router>
                <BikeDetail match={match} />
            </Router>
        );
    });

    it('should match', () => {
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should load bike list', () => {
        const bikeTestName = 'testName';
        dispatcher.dispatch({
            type: actionTypes.LOAD_BIKE_BY_ID,
            data: { bikeName: bikeTestName }
        });

        const bike = bikeStore.getBikeDetail();

        expect(bike.bikeName).toEqual(bikeTestName);
    });
});
