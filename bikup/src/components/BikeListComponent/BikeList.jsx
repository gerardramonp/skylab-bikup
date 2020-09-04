import React, { useState, useEffect } from 'react';
import bikeStore from '../../stores/bikeStore';
import {
    loadUserBikeList,
    loadBikeComponentList
} from '../../actions/bikeActions';

import StandardAside from '../StandardAside/StandardAside';
import BikeCard from './BikeCardComponent/BikeCard';

import '../../App.scss';
import './BikeList.scss';

function BikeList(props) {
    const [bikeList, setBikeList] = useState([]);

    const userId = '5f4e6c437edd9832f01d6cc5';

    useEffect(() => {
        bikeStore.addChangeListener(onChange);
        if (bikeList.length === 0) {
            loadUserBikeList(userId);
        }

        return () => bikeStore.removeChangeListener(onChange);
    });

    function onChange() {
        setBikeList(bikeStore.getBikeList());
    }

    function renderBikeList(bikeList) {
        const renderedBikeList = bikeList.map((bike) => {
            console.log(bikeList.length);
            return <BikeCard key={bike.bikeName} bikeInfo={bike} />;
        });
        return renderedBikeList;
    }

    return (
        <div className="bikelist">
            <div className="bikelist__content">
                <div className="bikelist__top">
                    <h2>Your Bikes</h2>
                    <img
                        className="strava__connect-btn"
                        src="https://trello-attachments.s3.amazonaws.com/5f4cb639a6f5eb1005114de4/5f4f63b8021a9d482184baf2/3cca3ad9320164155dfbb9d09ff7982f/btn_strava_connectwith_orange%402x.png"
                        alt="connect with strava"
                    />
                    <button className="bikelist__add--desktop desktop">
                        + Add new bike
                    </button>
                </div>
                <div className="bikelist__cards">
                    {bikeList.length > 0 ? (
                        renderBikeList(bikeList)
                    ) : (
                        <p>Loading bikes...</p>
                    )}
                </div>
                <button className="bikelist__add mobile">+ Add new bike</button>
            </div>
            <div className="bikelist__challenges-giveaways">
                <StandardAside />
            </div>
        </div>
    );
}

export default BikeList;
