import React from 'react';
import './CompoCard.scss';

function CompoCard({ compoInfo }) {
    console.log(compoInfo);
    return (
        <div className="compocard">
            <div className="card-decoration-1"></div>
            <div className="compocard__content">
                <img
                    src="https://image.flaticon.com/icons/svg/2623/2623442.svg"
                    alt="compo img"
                    className="compocard__img"
                />
                <div className="compocard__info">
                    <div className="compocard__labels">
                        <p>{compoInfo.name}</p>

                        <p className="labels__status">
                            ({compoInfo.accumulatedMeters / 1000} /
                            {compoInfo.life / 1000} Km)
                        </p>
                    </div>
                    <div>
                        <progress
                            id="progress"
                            value={compoInfo.accumulatedMeters / 1000}
                            max={compoInfo.life / 1000}
                        ></progress>
                    </div>
                </div>
                <button className="compocard__button">
                    <img
                        className="button__img"
                        src="https://image.flaticon.com/icons/svg/271/271228.svg"
                        alt=">"
                    />
                </button>
            </div>
        </div>
    );
}

export default CompoCard;
