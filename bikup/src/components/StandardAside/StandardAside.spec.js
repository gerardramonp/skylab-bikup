import React from 'react';
import renderer from 'react-test-renderer';
import StandardAside from './StandardAside';
import { BrowserRouter as Router } from 'react-router-dom';
import dispatcher from '../../dispatcher';
import bikeStore from '../../stores/bikeStore';
import actionTypes from '../../actions/actionTypes';

describe('Standard Aside', () => {
    let tree = renderer.create(
        <Router>
            <StandardAside />
        </Router>
    );

    it('should match', () => {
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
