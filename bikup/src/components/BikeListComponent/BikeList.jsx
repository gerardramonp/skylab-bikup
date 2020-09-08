import React, { useState, useEffect } from 'react';
import bikeStore from '../../stores/bikeStore';
import authStore from '../../stores/authStore';
import { loadUserBikeList } from '../../actions/bikeActions';
import { isUserAuthWithToken } from '../../actions/authActions';
import { useHistory } from 'react-router-dom';

import Header from '../HeaderComponent/Header';
import StandardAside from '../StandardAside/StandardAside';
import BikeCard from './BikeCardComponent/BikeCard';

import '../../App.scss';
import './BikeList.scss';

let userCheck = false;
let isUserAuth = null;
let userId = '';
function BikeList(props) {
    const [bikeList, setBikeList] = useState([]);

    const history = useHistory();

    async function handleAuthorization() {
        if (!userCheck) {
            await checkIfUserIsAuth();
        }
    }

    async function checkIfUserIsAuth() {
        await isUserAuthWithToken();
        isUserAuth = authStore.isUserAuth();
        if (!isUserAuth) {
            history.replace('/login');
        }
        userCheck = true;
    }

    useEffect(() => {
        handleAuthorization();

        bikeStore.addChangeListener(onChange);

        if (userCheck && bikeList.length === 0) {
            userId = JSON.parse(sessionStorage.authUser)._id;
            loadUserBikeList(userId);
        }

        return () => bikeStore.removeChangeListener(onChange);
    }, [bikeList.length]);

    function onChange() {
        setBikeList(bikeStore.getBikeList());
    }

    function renderBikeList(bikeList) {
        const renderedBikeList = bikeList.map((bike) => {
            return <BikeCard key={bike.bikeName} bikeInfo={bike} />;
        });
        return renderedBikeList;
    }

    return (
        <>
            <Header />
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
                            <p>OOPS! It seems that you don't have any bikes</p>
                        )}
                    </div>
                    <button className="bikelist__add mobile">
                        + Add new bike
                    </button>
                </div>
                <div className="bikelist__challenges-giveaways">
                    <StandardAside />
                </div>
            </div>
        </>
    );
}

export default BikeList;
