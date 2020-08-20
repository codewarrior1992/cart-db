const firebase = require('firebase');
require('dotenv').config();
var firebaseConfig = {
	apiKey: process.env.APIKEY,
	authDomain: process.env.AUTHDOMAIN,
	databaseURL: process.env.DATABASEURL,
	projectId: process.env.PROJECTID,
	storageBucket: process.env.STORAGEBUCKET,
	messagingSenderId: process.env.MESSAGINGSENDERID,
	appId: process.env.APPID,
};
// Initialize Firebase
const firebaseInit = firebase.initializeApp(firebaseConfig);
const fireAuth = firebaseInit.auth();

module.exports = fireAuth;
