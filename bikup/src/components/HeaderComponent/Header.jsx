import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

function Header() {
    const nav = [
        { text: 'My Bikes', url: '/bikes' },
        { text: 'Profile', url: '/user' }
    ];

    return (
        <header className="header">
            <img
                className="logo"
                src="https://cdn.discordapp.com/attachments/692420285143711814/693437226146594876/LogoGerili.png"
                alt="logo"
            />
            <p className="appName">bikUP</p>
            <ul className="header__navigation">
                {nav.map((link) => {
                    return (
                        <NavLink
                            key={link}
                            className="navigation__item"
                            activeClassName="active"
                            to={link.url}
                        >
                            {link.text}
                        </NavLink>
                    );
                })}
            </ul>
            <div className="flex-spacer"></div>
            <button className="login__button login__button--header">
                Log In
            </button>
        </header>
    );
}

export default Header;
