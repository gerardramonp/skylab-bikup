import dispatcher from '../dispatcher';
import actionTypes from './actionTypes';
import axios from 'axios';

export function loginOrRegisterUserStrava(authCode) {
    const params = {
        authCode
    };
    return axios.post('/api/auth/strava', params).then((response) => {
        sessionStorage.authUser = JSON.stringify(response.data);
        dispatcher.dispatch({
            type: actionTypes.LOGIN_USER_STRAVA,
            data: response.data
        });
    });
}

export function createUserWithMail(formData) {
    return axios.post('/api/auth/mail', formData).then((response) => {
        dispatcher.dispatch({
            type: actionTypes.CREATE_USER_MAIL,
            data: response.data
        });
    });
}

export function isUserAuthWithToken() {
    if (sessionStorage.authUser) {
        const { _id } = JSON.parse(sessionStorage.authUser) || null;
        const reqBody = {
            userId: _id
        };
        return axios.post('/api/auth/check', reqBody).then((response) => {
            dispatcher.dispatch({
                type: actionTypes.CHECK_CORRECT_USER,
                data: response.data
            });
        });
    } else {
        return false;
    }
}
