import dispatcher from '../dispatcher';
import actionTypes from './actionTypes';
import axios from 'axios';

export function createNewCompo(compoInfo) {
	if (sessionStorage.actualBike) {
		const { bikeUserId, _id } = JSON.parse(sessionStorage.actualBike);

		const params = {
			compoInfo,
			userId: bikeUserId,
			bikeId: _id,
		};
		return axios.post('/api/crud/compo', params).then((response) => {
			// FALTA FER LA LOGICA DEL STORE
			// Afegir compo al sessionStorage
			const newCompo = response.data;
			const actualBike = JSON.parse(sessionStorage.actualBike);
			actualBike.bikeComponentList.push(newCompo);
			sessionStorage.actualBike = JSON.stringify(actualBike);

			dispatcher.dispatch({
				type: actionTypes.ADD_NEW_COMPO,
				data: newCompo,
			});
		});
	} else {
		console.log('There is no loaded bike');
	}
}
