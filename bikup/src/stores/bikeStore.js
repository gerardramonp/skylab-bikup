import actionTypes from '../actions/actionTypes';
import dispatcher from '../dispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _bike = {};
let _bikeList = [];
let _bikeCompolist = [];

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
        debugger;
        return _bike;
    }

    setCompoList(compoList) {
        _bikeCompolist = compoList;
    }

    getCompoList() {
        return _bikeCompolist;
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
        case actionTypes.LOAD_BIKE_COMPO_LIST:
            bikeStore.setCompoList(action.data);
            bikeStore.emitChange();
            break;
        default:
            console.log(`There is no action with type: ${action.type}`);
            break;
    }
});

export default bikeStore;
