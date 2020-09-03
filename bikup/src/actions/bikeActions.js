import dispatcher from '../dispatcher';
import actionTypes from './actionTypes';
import axios from 'axios';

export function loadUserBikeList(bikeUserId) {
    if (!bikeUserId) {
        console.log('[loadUserBikeList] - userId param is required');
        return false;
    } else {
        const props = {
            params: {
                bikeUserId
            }
        };
        return axios.get(`/api/bikes`, props).then((payload) => {
            dispatcher.dispatch({
                type: actionTypes.LOAD_USER_BIKE_LIST,
                data: payload.data
            });
        });
    }
}

export function loadBikeById(bikeId) {
    return axios.get(`/api/bikes/${bikeId}`).then((payload) => {
        dispatcher.dispatch({
            type: actionTypes.LOAD_BIKE_BY_ID,
            data: payload.data[0]
        });
    });
}

export function loadBikeComponentList(compoBikeId) {
    debugger;
    return axios.get(`/api/${compoBikeId}/components`).then((payload) => {
        dispatcher.dispatch({
            type: actionTypes.LOAD_BIKE_COMPO_LIST,
            data: payload.data[0]
        });
    });
}
