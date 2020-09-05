import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import bikeStore from '../../stores/bikeStore';

import StandardAside from '../StandardAside/StandardAside';
import DetailCompoCard from './DetailCompoCardComponent/DetailCompoCard';

import './CompoDetail.scss';

function CompoDetail(props) {
    const [compoInfo] = useState(JSON.parse(sessionStorage.actualCompo));
    const [bikeInfo] = useState(JSON.parse(sessionStorage.actualBike));

    return (
        <div className="general-container">
            <div className="desktop">
                <StandardAside />
            </div>

            <div className="compodetail">
                <div className="compodetail__upper mobile">
                    <NavLink to="/bikes/">Back</NavLink>
                    <p className="upper__edit">Edit</p>
                </div>

                <div className="compodetail__head">
                    <div className="head__container">
                        <h2 className="head__compoName">
                            {bikeInfo.bikeName} - {compoInfo.compoDisplayName}
                        </h2>
                        <button className="compodetail__reset desktop">
                            Reset Component
                        </button>
                    </div>
                    <div className="separator"></div>

                    <div className="compodetail__km-hours">
                        <div className="km-hours km-hours__km">
                            <p className="km-hours__title">Total KM</p>
                            <div className="separator-small"></div>
                            <p className="km__value">
                                {compoInfo.compoAccumulatedMeters / 1000}
                            </p>
                        </div>
                        <div className="km-hours__hours km-hours">
                            <p className="km-hours__title">Total Hours</p>
                            <div className="separator-small"></div>
                            <p className="km-hours__value">
                                {Math.floor(
                                    compoInfo.compoAccumulatedMinutes / 60
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="compodetail__components">
                    <DetailCompoCard compoInfo={compoInfo} />
                </div>

                <div className="compodetail__details">
                    <div className="details__content">
                        <img
                            src="https://image.flaticon.com/icons/svg/2623/2623442.svg"
                            alt="bike type"
                            className="details__type-img"
                        />
                        <div className="details__info">
                            <p className="info__type">
                                {bikeInfo.bikeName} -{' '}
                                {compoInfo.compoDisplayName}
                            </p>
                            <p>'Unknown Brand' - 'Unknown Model'</p>
                            <p>Someinfo</p>
                        </div>
                    </div>
                </div>
                <button className="compodetail__reset mobile">
                    Reset Component
                </button>
            </div>
        </div>
    );
}

export default CompoDetail;
