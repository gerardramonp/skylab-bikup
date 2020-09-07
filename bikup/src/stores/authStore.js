import actionTypes from '../actions/actionTypes';
import dispatcher from '../dispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _stravaUser = null;
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

    getStravaUser() {
        return _stravaUser;
    }

    isUserAuth() {
        return _isUserAuth;
    }
}

const authStore = new AuthStore();

dispatcher.register((action) => {
    switch (action.type) {
        case actionTypes.LOGIN_USER_STRAVA:
            _stravaUser = action.data;
            sessionStorage.authUser = JSON.stringify(_stravaUser);
            authStore.emitChange();
            break;
        case actionTypes.CHECK_CORRECT_USER:
            _isUserAuth = action.data;
            break;
        default:
            console.log(`There is no action with type: ${action.type}`);
            break;
    }
});

export default authStore;
