import dispatcher from '../dispatcher';
import actionTypes from '../actions/actionTypes';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _bike = {};

class BikeStore extends EventEmitter {
	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	emitChange() {
		this.emit(CHANGE_EVENT);
	}

	setBikeDetail(bikeDetail) {
		_bike = bikeDetail;
	}

	getBikeDetail() {
		return _bike;
	}
}

const bikeStore = new BikeStore();

dispatcher.register((action) => {
	switch (action.type) {
		case actionTypes.LOAD_BIKE_BY_ID:
			bikeStore.setBikeDetail(action.data);
			bikeStore.emitChange();
			break;
		default:
			console.log(`There is no action with type: ${action.type}`);
			break;
	}
});

export default bikeStore;
