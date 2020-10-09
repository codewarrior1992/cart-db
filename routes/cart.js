var express = require('express');
var router = express.Router();
const firebaseDb = require('../connections/firebase-admin');
const fireAuth = require('../connections/firebase');
const cartRef = firebaseDb.ref('cart');

router.get('/', function (req, res, next) {
	res.send('hi');
});

/* session */
router.get('/session', function (req, res, next) {
	req.session.token = 123456789;
	let token = req.session.token;
	res.send({
		token,
	});
});

/* get cart list */
router.get('/get-cart', function (req, res, next) {
	cartRef.once('value', (snapshot) => {
		res.send({
			result: snapshot.val(),
		});
	});
});

/* add to cart list */
router.post('/post-cart', function (req, res, next) {
	// let user = fireAuth.currentUser();

	fireAuth.onAuthStateChanged(function (user) {
		if (user) {
			let items = [
				{
					title: 'haha',
					qty: 1,
				},
				{
					title: 'jaja',
					qty: 2,
				},
			];

			firebaseDb.ref(`/users/${user.uid}`).update({ cart: items });

			res.send({
				success: true,
				currentUser: user.uid,
			});
		} else {
			res.send({
				result: 'No user not sign in',
			});
		}
	});
});

/* update to cart list */
router.put('/update-cart', function (req, res, next) {});

/* remove from cart list */
router.post('/delete-cart', function (req, res, next) {});

module.exports = router;
