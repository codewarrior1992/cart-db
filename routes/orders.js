var express = require('express');
var router = express.Router();
const firebaseDb = require('../connections/firebase-admin');
const ordersRef = firebaseDb.ref('/orders');

/* get orders */
router.get('/get-orders', function (req, res, next) {
	ordersRef.once('value', (snapshot) => {
		res.send({
			success: true,
			message: 'get orders success',
			result: snapshot.val(),
		});
		res.end();
	});
});

/* create product */
router.post('/post-order', function (req, res, next) {
	// let data = req.body.data;
	// let oreder = ordersRef.push();
	// let key = oreder.key;
	// data.id = key;

	orders.set(data).then(() => {
		ordersRef.once('value', (snapshot) => {
			res.send({
				success: true,
				message: 'create product success',
				result: snapshot.val(),
			});
			res.end();
		});
	});
});

/* update product */
// router.put('/update-product/:id', function (req, res, next) {
// 	const id = req.params.id;
// 	const data = req.body.data;
// 	ordersRef
// 		.child(id)
// 		.update(data)
// 		.then(() => {
// 			ordersRef.once('value', (snapshot) => {
// 				res.send({
// 					success: true,
// 					message: 'update success',
// 					result: snapshot.val(),
// 				});
// 				res.end();
// 			});
// 		});
// });

// /* delete product */
// router.post('/delete-product/:id', function (req, res, next) {
// 	const id = req.params.id;
// 	ordersRef
// 		.child(id)
// 		.remove()
// 		.then(() => {
// 			ordersRef.once('value', (snapshot) => {
// 				res.send({
// 					success: true,
// 					message: 'remove success',
// 					result: snapshot.val(),
// 				});
// 				res.end();
// 			});
// 		});
// });

module.exports = router;
