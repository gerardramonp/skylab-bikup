import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import bikeStore from '../../stores/bikeStore';
import { loadBikeById } from '../../actions/bikeActions';

import StandardAside from '../StandardAside/StandardAside';

import '../../App.scss';
import './BikeList.scss';

function handleClick(bikeId) {
    loadBikeById(bikeId);
}

function BikeList(props) {
    const bikeId = '5f4e48d27edd9832f01d6cc4';
    const bikeName = 'my Bike Name';

    return (
        <NavLink
            to={`/bikes/${bikeName.replace(/ /g, '')}`}
            onClick={() => handleClick(bikeId)}
        >
            load {bikeId}
        </NavLink>
    );
}

export default BikeList;
