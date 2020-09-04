import dispatcher from '../dispatcher';
import actionTypes from './actionTypes';
import axios from 'axios';

export function loadUserBikeList(userId) {
    if (!userId) {
        console.log('[loadUserBikeList] - userId param is required');
        return false;
    } else {
        const props = {
            params: {
                bikeUserId: userId
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
            data: payload.data
        });
    });
}

export function loadCompoById(bikeId, compoId) {
    return axios.get(`api/bikes/${bikeId}/${compoId}`).then((payload) => {
        dispatcher.dispatch({
            type: actionTypes.LOAD_COMPO_BY_ID,
            data: payload.data
        });
    });
}
