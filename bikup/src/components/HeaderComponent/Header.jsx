import React from 'react';
import './Header.scss';

function Header() {
    const nav = ['My Bikes', 'Profile'];

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
                        <li key={link} className="navigation__item">
                            {link}
                        </li>
                    );
                })}
            </ul>
        </header>
    );
}

export default Header;
