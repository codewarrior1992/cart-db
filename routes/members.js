var express = require('express');
var router = express.Router();
const firebaseDb = require('../connections/firebase-admin');
const fireAuth = require('../connections/firebase');

router.post('/sign-up', function (req, res, next) {
	let { email, password } = req.body.data;

	fireAuth
		.createUserWithEmailAndPassword(email, password)
		.catch(function (error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			res.send({
				success: false,
				errorCode,
				errorMessage,
			});
		})
		.then((response) => {
			if (response !== undefined) {
				let userData = {
					email,
					uid: response.user.uid,
				};
				firebaseDb.ref(`/users/${response.user.uid}`).set(userData);
				res.send({
					success: true,
					response,
					responseText: '註冊成功',
				});
			}
			res.end();
		});
	// }
});

router.post('/sign-in', function (req, res, next) {
	let { email, password } = req.body.data;

	fireAuth
		.signInWithEmailAndPassword(email, password)
		.catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// ...
			res.send({
				success: false,
				errorCode,
				errorMessage,
			});
		})
		.then((response) => {
			if (response !== undefined) {
				res.send({
					success: true,
					response,
					responseText: '登入成功',
				});
			}
			res.end();
		});
});

router.get('/get-current', function (req, res, next) {
	// console.log(fireAuth.currentUser); // 若無則為 null
	fireAuth.onAuthStateChanged(function (user) {
		if (user) {
			// User is signed in.
			console.log(user);
			res.send({
				currentUser: user.uid,
			});
		} else {
			// No user is signed in.
			res.send({
				result: 'No user not sign in',
			});
		}
	});
});

module.exports = router;
