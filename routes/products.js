var express = require('express');
var router = express.Router();
const firebaseDb = require('../connections/firebase-admin');
const productsRef = firebaseDb.ref('/products');

/* create product */
router.post('/post-product', function (req, res, next) {
	let data = req.body.data;
	let product = productsRef.push();
	let key = product.key;
	data.id = key;

	product.set(data).then(() => {
		productsRef.once('value', (snapshot) => {
			res.send({
				success: true,
				message: 'create product success',
				result: snapshot.val(),
			});
			res.end();
		});
	});
});

/* get products */
router.get('/get-products', function (req, res, next) {
	productsRef.once('value', (snapshot) => {
		res.send({
			success: true,
			message: 'get products success',
			result: snapshot.val(),
		});
		res.end();
	});
});

/* get product */
router.get('/get-product/:id', function (req, res, next) {
	let id = req.params.id;
	productsRef.child(id).once('value', (snapshot) => {
		res.send({
			success: true,
			message: 'get product success',
			item: snapshot.val(),
		});
	});
});

/* update product */
router.put('/update-product/:id', function (req, res, next) {
	const id = req.params.id;
	const data = req.body.data;
	productsRef
		.child(id)
		.update(data)
		.then(() => {
			productsRef.once('value', (snapshot) => {
				res.send({
					success: true,
					message: 'update success',
					result: snapshot.val(),
				});
				res.end();
			});
		});
});

/* delete product */
router.post('/delete-product/:id', function (req, res, next) {
	const id = req.params.id;
	productsRef
		.child(id)
		.remove()
		.then(() => {
			productsRef.once('value', (snapshot) => {
				res.send({
					success: true,
					message: 'remove success',
					result: snapshot.val(),
				});
				res.end();
			});
		});
});

// upload Files
router.post('/upload-file', function (req, res, next) {
	const file = req.files;

	res.send({
		success: true,
		message: 'img upload success!',
	});
	res.end();
});

module.exports = router;
