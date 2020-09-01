import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';

import BikeDetail from './components/BikeDetailComponent/BikeDetail';
import Header from './components/HeaderComponent/Header';

function App() {
    return (
        <>
            <Header />
            <Switch>
                <Route path="/bikes/:bikeId" component={BikeDetail} />
            </Switch>
        </>
    );
}

export default App;
