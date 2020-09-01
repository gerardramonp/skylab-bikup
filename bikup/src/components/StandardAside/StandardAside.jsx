import React, { useState, useEffect } from 'react';
import './StandardAside.scss';

function StandardAside() {
    const challenges = [
        {
            name: 'BIrlfriend',
            description: 'Travel 5000km with a bike'
        },
        {
            name: 'CompoManiac',
            description: 'Change the same component 3 times'
        }
    ];

    return (
        <div className="standardaside">
            <h3>Challenges</h3>
            <div className="standardaside__card">
                {challenges.map((challenge) => {
                    return (
                        <div>
                            <div className="challenges__item">
                                <div className="item__title">
                                    <img
                                        className="title__img"
                                        src="https://image.flaticon.com/icons/svg/3112/3112946.svg"
                                        alt="trophy"
                                    />
                                    - {challenge.name} -
                                </div>
                                <p>{challenge.description}</p>
                            </div>
                            <div className="separator"></div>
                        </div>
                    );
                })}
            </div>

            <h3>Give Away</h3>
            <div className="standardaside__card">
                <p>something free</p>
            </div>
        </div>
    );
}

export default StandardAside;
