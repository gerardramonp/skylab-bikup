import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import bikeStore from '../../stores/bikeStore';
import { loadUserBikeList } from '../../actions/bikeActions';

import StandardAside from '../StandardAside/StandardAside';
import BikeCard from './BikeCardComponent/BikeCard';

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

    return (
        bikeList && (
            <div className="bikelist">
                <h2>Your Bikes</h2>
                <div className="bikelist__content">
                    <img
                        className="strava__connect-btn"
                        src="https://trello-attachments.s3.amazonaws.com/5f4cb639a6f5eb1005114de4/5f4f63b8021a9d482184baf2/3cca3ad9320164155dfbb9d09ff7982f/btn_strava_connectwith_orange%402x.png"
                        alt="connect with strava"
                    />
                    <div className="bikelist__cards">
                        {bikeList.map((bike) => {
                            return (
                                <BikeCard key={bike.bikeName} bikeInfo={bike} />
                            );
                        })}
                    </div>
                    <button className="bikelist__add">+ Add new bike</button>
                    <div className="bikelist__challenges-giveaways">
                        <StandardAside />
                    </div>
                </div>
            </div>
        )
    );
}

export default BikeList;
