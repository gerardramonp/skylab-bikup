import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import bikeStore from '../../stores/bikeStore';
import { loadUserBikeList, loadBikeById } from '../../actions/bikeActions';

import StandardAside from '../StandardAside/StandardAside';

import '../../App.scss';
import './BikeList.scss';

function BikeList(props) {
    const [bikeList, setBikeList] = useState([]);

    const userId = '5f4e6c437edd9832f01d6cc5';
    const bikeId = '5f4e48d27edd9832f01d6cc4';
    const bikeName = 'my Bike Name';

    useEffect(() => {
        bikeStore.addChangeListener(onChange);
        if (bikeList.length === 0) {
            loadUserBikeList(userId);
        }
        return () => bikeStore.removeChangeListener(onChange);
    }, [bikeList.length]);

    function onChange() {
        setBikeList(bikeStore.getBikeList());
    }

    function handleClick(bikeId) {
        loadBikeById(bikeId);
    }

    return (
        bikeList && (
            <div>
                {bikeList.map((bike) => {
                    return (
                        <div key={bike._id}>
                            <NavLink
                                to={`/bikes/${bikeName.replace(/ /g, '')}`}
                                onClick={() => handleClick(bike._id)}
                            >
                                load {bike._id}
                            </NavLink>
                        </div>
                    );
                })}
            </div>
        )
    );
}

export default BikeList;
