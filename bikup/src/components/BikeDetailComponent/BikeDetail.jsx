import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import bikeStore from '../../stores/bikeStore';
import { loadBikeById } from '../../actions/bikeActions';

import CompoCard from './CompoCardComponent/CompoCard';
import StandardAside from '../StandardAside/StandardAside';

import '../../App.scss';
import './BikeDetail.scss';

function BikeDetail(props) {
    const [bikeDetail, setBikeDetail] = useState({});

    const paramsBikeId = props.match.params.bikeId;

    useEffect(() => {
        bikeStore.addChangeListener(onChange);
        if (!bikeDetail.bikeId) {
            loadBikeById(paramsBikeId);
        }
        return () => bikeStore.removeChangeListener(onChange);
    });

    function onChange() {
        setBikeDetail(bikeStore.getBikeDetail());
    }

    let compoCount = 0;

    return (
        bikeDetail && (
            <div className="general-container">
                <div>
                    <StandardAside />
                </div>

                <div className="bike-detail">
                    <div className="bike-detail__upper mobile">
                        <NavLink to="/bikes">Back</NavLink>
                        <p className="upper__edit">Edit</p>
                    </div>
                    <div className="bike-detail__head">
                        <h2>{bikeDetail.bikeName}</h2>
                        <div className="bike-detail__km-hours">
                            <div className="km-hours km-hours__km">
                                <p className="km-hours__title">Total KM</p>
                                <p className="km__value">
                                    {bikeDetail.totalMeters / 1000}
                                </p>
                            </div>
                            <div className="km-hours__hours km-hours">
                                <p className="km-hours__title">Total Hours</p>
                                <p className="km-hours__value">
                                    {Math.floor(bikeDetail.totalMinutes / 60)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bike-detail__components">
                        {bikeDetail.components &&
                            bikeDetail.components.map((compo) => (
                                <CompoCard
                                    key={++compoCount}
                                    compoInfo={compo}
                                />
                            ))}
                    </div>

                    <div className="bike-detail__details">
                        <div className="card-decoration"></div>
                        <div className="details__content">
                            <img
                                src="https://image.flaticon.com/icons/svg/829/829906.svg"
                                alt="bike type"
                                className="details__type-img"
                            />
                            <div className="details__info">
                                <p className="info__type">
                                    {bikeDetail.bikeType}
                                </p>
                                <p>
                                    {bikeDetail.bikeBrand || 'Unknown Brand'} -{' '}
                                    {bikeDetail.bikeModel || 'Unknown Model'}
                                </p>
                                <p>Driving Style: {bikeDetail.driveStyle}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default BikeDetail;
