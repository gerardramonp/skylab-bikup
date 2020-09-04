import React from 'react';
import { NavLink } from 'react-router-dom';

import StandardAside from '../StandardAside/StandardAside';
import CompoCard from '../BikeDetailComponent/CompoCardComponent/CompoCard';

import './CompoDetail.scss';

function CompoDetail(props) {
    return (
        <div className="general-container">
            <div className="desktop">
                <StandardAside />
            </div>

            <div className="compodetail">
                <div className="compodetail__upper mobile">
                    <NavLink to="/bikes">Back</NavLink>
                    <p className="upper__edit">Edit</p>
                </div>

                <div className="compodetail__head">
                    <h2 className="head__compoName">componame</h2>
                    <div className="separator"></div>

                    <div className="compodetail__km-hours">
                        <div className="km-hours km-hours__km">
                            <p className="km-hours__title">Total KM</p>
                            <div className="separator-small"></div>
                            <p className="km__value">{1000000 / 1000}</p>
                        </div>
                        <div className="km-hours__hours km-hours">
                            <p className="km-hours__title">Total Hours</p>
                            <div className="separator-small"></div>
                            <p className="km-hours__value">
                                {Math.floor(858 / 60)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="compodetail__components">
                    <CompoCard
                        compoInfo={{ compoDisplayName: 'random' }}
                        bikeName={'fullRandom'}
                    />
                </div>

                <div className="compodetail__details">
                    <div className="details__content">
                        <img
                            src="https://image.flaticon.com/icons/svg/2623/2623442.svg"
                            alt="bike type"
                            className="details__type-img"
                        />
                        <div className="details__info">
                            <p className="info__type">Info</p>
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
