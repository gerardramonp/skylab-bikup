import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import bikeStore from '../../../stores/bikeStore';
import {
    loadBikeById,
    loadBikeComponentList
} from '../../../actions/bikeActions';
import './BikeCard.scss';

function calculateLifePercent(component) {
    const { life, accumulatedMeters } = component;

    return accumulatedMeters / life;
}

function checkSoonRepair(componentList) {
    const compoPercents = componentList.map((compo) => {
        const percent = calculateLifePercent(compo);
        return { [compo.name]: percent };
    });

    compoPercents.sort(function (a, b) {
        return Object.values(b)[0] - Object.values(a)[0];
    });

    return componentList.find((compo) => {
        return compo.name === Object.keys(compoPercents[0])[0];
    });
}

function BikeCard({ bikeInfo }) {
    const [bikeCompoList, setBikeCompoList] = useState([]);

    useEffect(() => {
        if (bikeCompoList.length === 0) {
            debugger;
        }
    });

    let soonCompo = null;

    function handleClick(bikeId) {
        loadBikeById(bikeId);
    }

    if (bikeInfo) {
        debugger;
        (async function loadCompos() {
            await loadBikeComponentList(bikeInfo._id);
            setBikeCompoList(bikeStore.getCompoList());
            soonCompo = checkSoonRepair(bikeCompoList);
        })();
    }
    return (
        soonCompo && (
            <div className="bikecard__container">
                <div className="bikecard">
                    <div className="bikecard__top">
                        <p className="top__name">{bikeInfo.bikeName}</p>
                        <p className="top__km">
                            {bikeInfo.bikeTotalMeters / 1000} Km
                        </p>
                    </div>
                    <div className="bikecard__separator"></div>
                    <div className="bikecard__repair">
                        <div className="repair__labbels">
                            <p>Check Soon</p>
                            <p className="labbels__value">
                                ({soonCompo.accumulatedMeters / 1000} /
                                {soonCompo.life / 1000} Km)
                            </p>
                        </div>
                        <div className="repair__progress">
                            <p>{soonCompo.name}</p>
                            <progress
                                id="progress"
                                value={soonCompo.accumulatedMeters / 1000}
                                max={soonCompo.life / 1000}
                            ></progress>
                        </div>
                    </div>
                    <div className="bikecard__bottom">
                        <div className="bottom__likes">
                            <img
                                className="likes__img"
                                src="https://trello-attachments.s3.amazonaws.com/5f4cb639a6f5eb1005114de4/5f4f9c254b020643891c14bc/90b81067b9d4a63e2284da24c9994e7f/heart.png"
                                alt="likes"
                            />
                            <span className="likes__count">
                                {bikeInfo.bikeLikes}
                            </span>
                        </div>
                        <div className="bottom__details">
                            <NavLink
                                className="details__button"
                                to={`/bikes/${bikeInfo.bikeName.replace(
                                    / /g,
                                    ''
                                )}`}
                                onClick={() => handleClick(bikeInfo._id)}
                            >
                                Go to Bike
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default BikeCard;
