import React from 'react';
import { NavLink } from 'react-router-dom';

import './Login.scss';

function Login() {
    return (
        <>
            <div className="landing__header desktop">
                <img
                    className="logo"
                    src="https://cdn.discordapp.com/attachments/692420285143711814/693437226146594876/LogoGerili.png"
                    alt="logo"
                />
                <p className="appName">bikUP</p>
                <div className="flex-spacer"></div>
                <button className="login__button login__button--header">
                    Log In
                </button>
            </div>
            <div className="register__upper mobile">
                <NavLink to="/">
                    <img
                        src="https://cdn.discordapp.com/attachments/692420285143711814/693437226146594876/LogoGerili.png"
                        alt="bikup logo"
                        className="register__logo"
                    />
                </NavLink>
                <NavLink to="/" className="register__bikup">
                    bikUP
                </NavLink>
            </div>
            <div className="login">
                <div className="login__container">
                    <h1>Log In</h1>

                    <form action="" className="login__form" method="POST">
                        <label htmlFor="email" className="input__label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="login__email login__input"
                            name="email"
                        />
                        <label htmlFor="password" className="input__label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="login__password login__input"
                            name="password"
                        />

                        <div className="form__bottom">
                            <NavLink to="/register">Create an account</NavLink>
                            <div className="flex-spacer"></div>
                            <button className="login__button" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>

                    <div className="register__separator">
                        <div className="line"></div>
                        <span className="bold">Or</span>
                        <div className="line"></div>
                    </div>

                    <div className="login__external">
                        <button className="register__btn strava">
                            <div className="btn__logo">
                                <img
                                    src="https://trello-attachments.s3.amazonaws.com/5f4cb639a6f5eb1005114de4/5f53a18bf970328231db4f61/2f6af477333d585dfbfc19a14da9f857/strava-2.svg"
                                    alt="google logo"
                                />
                            </div>
                            <div className="btn__text">Login with Strava</div>
                        </button>

                        <button className="register__btn google">
                            <div className="btn__logo">
                                <img
                                    src="https://trello-attachments.s3.amazonaws.com/5f4cb639a6f5eb1005114de4/5f53a18bf970328231db4f61/99c6b9ab576aa9e324980db26e5fc7c0/google-logo.png"
                                    alt="google logo"
                                />
                            </div>
                            <div className="btn__text">Login with Google</div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
