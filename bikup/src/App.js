import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';

import Header from './components/HeaderComponent/Header';
import BikeList from './components/BikeListComponent/BikeList';
import BikeDetail from './components/BikeDetailComponent/BikeDetail';
import CompoDetail from './components/CompoDetailComponent/CompoDetail';

function App() {
    return (
        <>
            <Header />
            <Switch>
                <Route path="/bikes" exact component={BikeList} />
                <Route path="/bikes/:bikeId" exact component={BikeDetail} />
                <Route
                    path="/bikes/:bikeId/:compoId"
                    exact
                    component={CompoDetail}
                />
            </Switch>
        </>
    );
}

export default App;
