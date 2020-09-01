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
            <p>Challenges</p>
            <div className="standardaside__challenges">
                {challenges.map((challenge) => {
                    return (
                        <div>
                            <div className="challenges__item">
                                <p>{challenge.name}</p>
                                <p>{challenge.description}</p>
                            </div>
                            <div className="separator"></div>
                        </div>
                    );
                })}
            </div>

            <p>Give Away</p>
            <div className="standardaside__giveaway">
                <p>something free</p>
            </div>
        </div>
    );
}

export default StandardAside;
