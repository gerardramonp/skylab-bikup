import dispatcher from '../dispatcher';
import actionTypes from './actionTypes';
import axios from 'axios';

export function loadBikeById(bikeId) {
    //Fer fetch a la API
    // Resoldre la promesa i fer el dispatch amb el action type i data
    return axios.get(`/api/bikes/${bikeId}`).then((payload) => {
        dispatcher.dispatch({
            type: actionTypes.LOAD_BIKE_BY_ID,
            data: payload.data[0]
        });
    });
}
