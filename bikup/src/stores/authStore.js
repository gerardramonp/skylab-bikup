import actionTypes from '../actions/actionTypes';
import dispatcher from '../dispatcher';
import { EventEmitter } from 'events';
import { createNewBike } from '../actions/bikeActions';

const CHANGE_EVENT = 'change';

let _authUser = null;
let _isUserAuth = false;

class AuthStore extends EventEmitter {
	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	emitChange() {
		this.emit(CHANGE_EVENT);
	}

	getAuthUser() {
		return _authUser;
	}

	isUserAuth() {
		return _isUserAuth;
	}
}

const authStore = new AuthStore();

dispatcher.register((action) => {
	switch (action.type) {
		case actionTypes.LOGIN_USER_STRAVA:
			_authUser = action.data;
			_authUser && (sessionStorage.authUser = JSON.stringify(_authUser));
			// si te bicis crearles
			if (_authUser.bikeList) {
				debugger;
				_authUser.bikeList.forEach((bike) => {
					createNewBike(bike);
				});
			}
			authStore.emitChange();
			break;
		case actionTypes.LOGIN_USER_MAIL:
			_authUser = action.data;
			_authUser && (sessionStorage.authUser = JSON.stringify(_authUser));
			authStore.emitChange();
			break;
		case actionTypes.CREATE_USER_MAIL:
			_authUser = action.data;
			sessionStorage.authUser = JSON.stringify(_authUser);
			authStore.emitChange();
			break;
		case actionTypes.CHECK_CORRECT_USER:
			_isUserAuth = action.data;
			authStore.emitChange();
			break;
		default:
			console.log(`There is no action with type: ${action.type}`);
			break;
	}
});

export default authStore;
