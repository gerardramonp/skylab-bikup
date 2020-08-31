import dispatcher from '../dispatcher';
import actionTypes from '../actions/actionTypes';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _bike = [];

class BikeDetailStore extends EventEmitter {
	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	emitChange() {
		this.emit(CHANGE_EVENT);
	}
}

const bikeDetailStore = new BikeDetailStore();

dispatcher.register((action) => {
	switch (action.type) {
		case actionTypes.LOAD_REPO_LIST:
			_repoList = action.data;
			userDetailStore.emitChange(_repoList);
			break;

		default:
			console.log(`There is no action with type: ${action.type}`);
			break;
	}
});

export default bikeDetailStore;
