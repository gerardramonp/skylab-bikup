import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { isUserAuthWithToken } from '../../actions/authActions';

import authStore from '../../stores/authStore';

import './Profile.scss';

let isUserAuth = null;
let userCheck = false;
let userInfo = null;

function Profile() {
	let [userInfo, setUserInfo] = useState();

	const history = useHistory();

	async function handleAuthorization() {
		await checkIfUserIsAuth();
	}

	async function checkIfUserIsAuth() {
		await isUserAuthWithToken();
		isUserAuth = authStore.isUserAuth();
		if (!isUserAuth) {
			history.replace('/login');
		} else {
			userCheck = true;
			userInfo = JSON.parse(sessionStorage.authUser);
		}
	}

	useEffect(() => {
		authStore.addChangeListener(onAuthChange);
		handleAuthorization();
	}, [isUserAuth]);

	function onAuthChange() {
		isUserAuth = authStore.isUserAuth();
		isUserAuth &&
			setUserInfo((userInfo = JSON.parse(sessionStorage.authUser)));
	}

	return (
		(userInfo && (
			<>
				<div className='general-container'>
					<div className='profile'>
						<div className='profile__container'>
							<div className='profile__picture'>
								<img
									className='picture__img'
									src={userInfo.profilePicture}
									alt='User profile picture'
								/>
							</div>
							<div className='profile__main'>
								<h3>{userInfo.username} Profile</h3>
								<div className='main__info'>
									<p>
										Connected with strava:{' '}
										{userInfo.stravaAccessToken
											? 'yes'
											: 'no'}
									</p>
								</div>
							</div>
							<div className='profile__edit'></div>
						</div>
					</div>
				</div>
			</>
		)) || <p>loading...</p>
	);
}

export default Profile;
