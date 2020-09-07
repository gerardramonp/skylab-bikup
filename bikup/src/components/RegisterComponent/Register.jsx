import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import './Register.scss';

function Register() {
    const history = useHistory();

    let isFormValid = false;

    function handleLogoClick() {
        history.push('/');
    }

    function checkRepeatPassword() {
        const password = document.getElementsByClassName(
            'register__password'
        )[0].value;
        const repeat = document.getElementsByClassName(
            'register__repeat-password'
        )[0].value;

        if (password === repeat) {
            isFormValid = true;
            debugger;
        } else {
            isFormValid = false;
            const element = (document.getElementsByClassName(
                'login__warning'
            )[0].innerHTML = 'Passwords must match');
        }
    }

    function handleSubmit() {
        debugger;
        if (isFormValid) {
            document.registerForm.submit();
            return true;
        }
        return false;
    }

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
                <button className="register__button register__button--header">
                    Log In
                </button>
            </div>
            <div className="register__upper mobile">
                <img
                    src="https://cdn.discordapp.com/attachments/692420285143711814/693437226146594876/LogoGerili.png"
                    alt="bikup logo"
                    className="register__logo"
                    onClick={handleLogoClick}
                />
                <NavLink to="/" className="register__bikup">
                    bikUP
                </NavLink>
                <div className="flex-spacer"></div>
                <NavLink className="login__button" to="/login">
                    Log In
                </NavLink>
            </div>
            <div className="register">
                <div className="register__container">
                    <h1>Create an account</h1>

                    <form
                        name="registerForm"
                        action=""
                        className="register__form"
                        method="POST"
                    >
                        <label
                            htmlFor="email"
                            className="input__label"
                            required
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="register__email register__input"
                            name="email"
                            placeholder="Enter your email..."
                            required
                        />
                        <label htmlFor="password" className="input__label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="register__password register__input"
                            name="password"
                            placeholder="Enter your password..."
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
                            required
                        />
                        <label
                            htmlFor="repeat-password"
                            className="input__label"
                        >
                            Repeat Password
                        </label>
                        <input
                            type="password"
                            className="register__repeat-password register__input"
                            name="repeat-password"
                            placeholder="Repeat the password..."
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
                            required
                            onChange={(event) => {
                                event.preventDefault();

                                checkRepeatPassword();
                            }}
                        />
                        <div className="login__warning "></div>
                        <div className="register__form__bottom">
                            <button
                                className="register__button"
                                type="submit"
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    handleSubmit();
                                }}
                            >
                                Create Account
                            </button>
                        </div>
                    </form>

                    <div className="register__separator">
                        <div className="line"></div>
                        <span className="bold">Or</span>
                        <div className="line"></div>
                    </div>

                    <div className="register__external">
                        <button className="register__btn strava">
                            <div className="btn__logo">
                                <img
                                    src="https://trello-attachments.s3.amazonaws.com/5f4cb639a6f5eb1005114de4/5f53a18bf970328231db4f61/2f6af477333d585dfbfc19a14da9f857/strava-2.svg"
                                    alt="google logo"
                                />
                            </div>
                            <div className="btn__text">
                                register with Strava
                            </div>
                        </button>

                        <button className="register__btn google">
                            <div className="btn__logo">
                                <img
                                    src="https://trello-attachments.s3.amazonaws.com/5f4cb639a6f5eb1005114de4/5f53a18bf970328231db4f61/99c6b9ab576aa9e324980db26e5fc7c0/google-logo.png"
                                    alt="google logo"
                                />
                            </div>
                            <div className="btn__text">
                                register with Google
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
