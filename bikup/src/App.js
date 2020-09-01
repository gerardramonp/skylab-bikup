import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';

import Header from './components/HeaderComponent/Header';
import BikeList from './components/BikeListComponent/BikeList';
import BikeDetail from './components/BikeDetailComponent/BikeDetail';

function App() {
    return (
        <>
            <Header />
            <Switch>
                <Route path="/bikes" exact component={BikeList} />
                <Route path="/bikes/:bikeId" component={BikeDetail} />
            </Switch>
        </>
    );
}

export default App;
