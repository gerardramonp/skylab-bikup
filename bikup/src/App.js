import React from 'react';
import './App.css';
import BikeDetail from './components/BikeDetailComponent/BikeDetail';
import { Route, Switch } from 'react-router-dom';

function App() {
	return (
		<Switch>
			<Route path='/bikes/:bikeId' component={BikeDetail} />
		</Switch>
	);
}

export default App;
