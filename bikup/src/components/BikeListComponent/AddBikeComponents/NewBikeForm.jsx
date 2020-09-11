import React from 'react';
import { NavLink } from 'react-router-dom';

import './NewBikeForm.scss';

import Header from '../../HeaderComponent/Header';

const bikeTypeList = [
	{ value: 'mountain', displayText: 'Mountain Bike', image: '' },
	{ value: 'road', displayText: 'Road Bike', image: '' },
	{ value: 'enduro_downhill', displayText: 'Enduro / Downhill', image: '' },
	{ value: 'gravel_cross', displayText: 'Gravel / Cross', image: '' },
];

const drivingStyleList = [
	{ value: 'soft', displayText: 'Soft', image: '' },
	{ value: 'moderate', displayText: 'Moderate', image: '' },
	{ value: 'aggressive', displayText: 'Aggressive', image: '' },
];

function getFormElements() {
	const bikeNameElement = document.getElementsByClassName('');
}

function validateForm() {}

function NewBikeForm() {
	return (
		<>
			<Header />
			<div className='general-container'>
				<div className='newbikeform'>
					<div className='newbikeform__upper mobile'>
						<NavLink to='/bikes'>My bikes</NavLink>
					</div>
					<div className='newbikeform-container'>
						<h1 className='newbikeform__title'>New bike</h1>
						<form className='newbikeform__form'>
							<div className='newbikeform__element'>
								<label
									htmlFor='bikename'
									className='newbikeform__label'
								>
									Bike Name
								</label>
								<input
									type='text'
									name='bikename'
									className='newbikeform__bikename newbikeform__input'
									required
								/>
							</div>
							<div className='newbikeform__element'>
								<label
									htmlFor='bikeType'
									className='newbikeform__label'
								>
									Type
								</label>
								<select
									name='bikeType'
									className='newbikeform__bikename newbikeform__input'
									required
								>
									{bikeTypeList.map((bikeType) => {
										return (
											<option value={bikeType.value}>
												{bikeType.displayText}
											</option>
										);
									})}
								</select>
							</div>
							<div className='newbikeform__element'>
								<label
									htmlFor='bikeDriveStyle'
									className='newbikeform__label'
								>
									Driving Style
								</label>
								<select
									type='text'
									name='bikeDriveStyle'
									className='newbikeform__bikename newbikeform__input'
									required
								>
									{drivingStyleList.map((drivingStyle) => {
										return (
											<option value={drivingStyle.value}>
												{drivingStyle.displayText}
											</option>
										);
									})}
								</select>
							</div>
							<div className='newbikeform__element'>
								<label
									htmlFor='bikeBrand'
									className='newbikeform__label'
								>
									Brand
								</label>
								<input
									type='text'
									name='bikeBrand'
									className='newbikeform__bikename newbikeform__input'
								/>
							</div>
							<div className='newbikeform__element'>
								<label
									htmlFor='bikeModel'
									className='newbikeform__label'
								>
									Model
								</label>
								<input
									type='text'
									name='bikeModel'
									className='newbikeform__bikename newbikeform__input'
								/>
							</div>
							<div className='newbikeform__element'>
								<p className='newbikeform__warning'>
									warning message
								</p>
							</div>
							<button className='newbikeform__create-button'>
								Create Bike
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default NewBikeForm;
