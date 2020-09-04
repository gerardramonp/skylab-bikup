import actionTypes from '../actions/actionTypes';
import dispatcher from '../dispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _bike = {};
let _bikeList = [];
let _compoDetail = {};

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

    setBikeList(bikeList) {
        _bikeList = bikeList;
    }

    getBikeList() {
        return _bikeList;
    }

    setBikeDetail(bikeDetail) {
        _bike = bikeDetail;
    }

    getBikeDetail() {
        return _bike;
    }

    setCompoDetail(compoDetail) {
        _compoDetail = compoDetail;
    }

    getCompoDetail() {
        return _compoDetail;
    }
}

const bikeStore = new BikeStore();

dispatcher.register((action) => {
    switch (action.type) {
        case actionTypes.LOAD_BIKE_BY_ID:
            bikeStore.setBikeDetail(action.data);
            bikeStore.emitChange();
            break;
        case actionTypes.LOAD_USER_BIKE_LIST:
            bikeStore.setBikeList(action.data);
            bikeStore.emitChange();
            break;
        case actionTypes.LOAD_COMPO_BY_ID:
            debugger;
            bikeStore.setCompoDetail(action.data);
            bikeStore.emitChange();
            break;
        default:
            console.log(`There is no action with type: ${action.type}`);
            break;
    }
});

export default bikeStore;
