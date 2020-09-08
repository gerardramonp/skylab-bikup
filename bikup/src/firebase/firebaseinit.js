import firebase from 'firebase/app';
import 'firebase/auth';

var firebaseConfig = {
	apiKey: 'AIzaSyBg8yIQrIkbTIyXmwT6jUhvduhSeSMBbdU',
	authDomain: 'bikup-29c68.firebaseapp.com',
	databaseURL: 'https://bikup-29c68.firebaseio.com',
	projectId: 'bikup-29c68',
	storageBucket: 'bikup-29c68.appspot.com',
	messagingSenderId: '28986620960',
	appId: '1:28986620960:web:257520ac7f465281441045',
	measurementId: 'G-3R8ER30RPL',
};

firebase.initializeApp(firebaseConfig);
firebase.auth();
