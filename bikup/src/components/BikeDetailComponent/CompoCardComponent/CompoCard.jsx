import React from 'react';
import './CompoCard.scss';
import { NavLink } from 'react-router-dom';

function CompoCard({ compoInfo, bikeName }) {
    console.log(compoInfo);
    return (
        <div className="compocard">
            <div className="compocard__content">
                <img
                    src="https://image.flaticon.com/icons/svg/2623/2623442.svg"
                    alt="compo img"
                    className="compocard__img"
                />
                <div className="compocard__info">
                    <div className="compocard__labels">
                        <p>{compoInfo.compoDisplayName}</p>

                        <p className="labels__status">
                            ({compoInfo.compoAccumulatedMeters / 1000} /
                            {compoInfo.compoLife / 1000} Km)
                        </p>
                    </div>
                    <div>
                        <progress
                            id="progress"
                            value={compoInfo.compoAccumulatedMeters / 1000}
                            max={compoInfo.compoLife / 1000}
                        ></progress>
                    </div>
                </div>

                <NavLink
                    className="compocard__button"
                    to={`/bikes/${bikeName.replace(
                        / /g,
                        ''
                    )}/${compoInfo.compoDisplayName.replace(/ /g, '')}`}
                >
                    <img
                        className="button__img"
                        src="https://image.flaticon.com/icons/svg/271/271228.svg"
                        alt=">"
                    />
                </NavLink>
            </div>
        </div>
    );
}

export default CompoCard;
