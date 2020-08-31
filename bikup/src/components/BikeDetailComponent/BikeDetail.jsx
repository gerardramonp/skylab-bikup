import React, { useState, useEffect } from 'react';
import bikeStore from '../../stores/bikeStore';
import { loadBike } from '../../actions/bikeActions';

function BikeDetail(props) {
	const [bikeDetail, setBikeDetail] = useState({});

	const paramsBikeId = props.match.params.bikeId;

	useEffect(() => {
		bikeStore.addChangeListener(onChange);
		if (!bikeDetail.bikeId) {
			loadBike(paramsBikeId);
		}
		return () => bikeStore.removeChangeListener(onChange);
	});

	function onChange() {
		setBikeDetail(bikeStore.getBikeDetail());
	}

	return (
		bikeDetail && (
			<div className='BikeDetail'>
				<p>bikeName: {bikeDetail.bikeId}</p>
			</div>
		)
	);
}

export default BikeDetail;
