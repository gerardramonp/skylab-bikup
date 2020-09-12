import dispatcher from '../dispatcher';
import actionTypes from './actionTypes';
import axios from 'axios';
import EditBike from '../components/BikeDetailComponent/EditBikeComponent/EditBike';

export function loadUserBikeList(userId) {
	if (!userId) {
		console.log('[loadUserBikeList] - userId param is required');
		return false;
	} else {
		const props = {
			params: {
				bikeUserId: userId,
			},
		};
		return axios.get(`/api/bikes`, props).then((payload) => {
			dispatcher.dispatch({
				type: actionTypes.LOAD_USER_BIKE_LIST,
				data: payload.data,
			});
		});
	}
}

export function loadBikeById(bikeId) {
	return axios.get(`/api/bikes/${bikeId}`).then((payload) => {
		dispatcher.dispatch({
			type: actionTypes.LOAD_BIKE_BY_ID,
			data: payload.data,
		});
	});
}

export function loadCompoById(bikeId, compoId) {
	return axios.get(`/api/bikes/${bikeId}/${compoId}`).then((payload) => {
		dispatcher.dispatch({
			type: actionTypes.LOAD_COMPO_BY_ID,
			data: payload.data,
		});
	});
}

export function createNewBike(newBikeInfo) {
	// Llegir id usuari del sessionstorage
	if (sessionStorage.authUser) {
		const { _id } = JSON.parse(sessionStorage.authUser);

		const params = {
			newBikeInfo,
			_id,
		};
		return axios.post(`/api/crud/bike`, params).then((newBike) => {
			dispatcher.dispatch({
				type: actionTypes.CREATE_NEW_BIKE,
				data: newBike.data,
			});
		});
	} else {
		console.log('User is not auth');
	}
}

export function deleteBike() {
	// llegir id de la bici
	if (sessionStorage.actualBike) {
		const { _id } = JSON.parse(sessionStorage.actualBike);
		const params = {
			bikeId: _id,
		};
		return axios.put('/api/crud/bike/delete', params).then((response) => {
			dispatcher.dispatch({
				type: actionTypes.DELETE_BIKE,
				data: response.data,
			});
		});
	} else {
		console.log('There is no loaded bike');
	}
}

export function editBike(bikeInfo, isNameChanged) {
	if (sessionStorage.actualBike) {
		const { _id } = JSON.parse(sessionStorage.actualBike);

		const params = {
			bikeId: _id,
			bikeInfo,
			isNameChanged,
		};
		return axios.put('/api/crud/bike/edit', params).then((response) => {
			dispatcher.dispatch({
				type: actionTypes.DELETE_BIKE,
				data: response.data,
			});
		});
	} else {
		console.log('There is no loaded bike');
	}
}
