import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';

import Landing from './components/LandingComponent/Landing';
import Login from './components/LoginComponent/Login';
import Register from './components/RegisterComponent/Register';
import AuthStrava from './components/AuthComponent/AuthStrava';
import BikeList from './components/BikeListComponent/BikeList';
import BikeDetail from './components/BikeDetailComponent/BikeDetail';
import CompoDetail from './components/CompoDetailComponent/CompoDetail';

function App() {
    return (
        <>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/auth/strava" exact component={AuthStrava} />

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
