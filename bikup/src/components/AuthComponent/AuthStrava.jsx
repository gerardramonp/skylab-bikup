import React, { useState, useEffect } from 'react';
import { loginOrRegisterUserStrava } from '../../actions/authActions';
import { useHistory } from 'react-router-dom';
import authStore from '../../stores/authStore';

function AuthStrava(props) {
    const [stravaUser, setStravaUser] = useState(authStore.getStravaUser());

    const history = useHistory();

    const searchParams = new URLSearchParams(window.location.search);
    const authCode = searchParams.get('code');

    useEffect(() => {
        authStore.addChangeListener(onChange);
        if (!stravaUser) {
            loginOrRegisterUserStrava(authCode);
        } else {
            history.replace('/bikes');
        }
    });

    function onChange() {
        setStravaUser(authStore.getStravaUser());
    }

    return <p className="">checking account...</p>;
}

export default AuthStrava;
