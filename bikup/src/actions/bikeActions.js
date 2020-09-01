import dispatcher from '../dispatcher';
import actionTypes from './actionTypes';
import axios from 'axios';

export function loadUserBikeList(userId) {
    const props = {
        params: {
            userId
        }
    };
    return axios.get(`/api/bikes`, props).then((payload) => {
        dispatcher.dispatch({
            type: actionTypes.LOAD_USER_BIKE_LIST,
            data: payload.data
        });
    });
}

export function loadBikeById(bikeId) {
    return axios.get(`/api/bikes/${bikeId}`).then((payload) => {
        dispatcher.dispatch({
            type: actionTypes.LOAD_BIKE_BY_ID,
            data: payload.data[0]
        });
    });
}
