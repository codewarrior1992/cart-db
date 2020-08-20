var express = require('express');
var router = express.Router();
const firebaseDb = require('../connections/firebase-admin');
const productsRef = firebaseDb.ref('/products');

router.get('/', function (req, res, next) {
	res.send('hi !');
});

/* get products */
router.get('/get-products', function (req, res, next) {
	productsRef.once('value', (snapshot) => {
		res.send({
			success: true,
			responseText: 'success',
			responseData: snapshot.val(),
		});
		res.end();
	});
});

/* create product */
router.post('/post-product', function (req, res, next) {
	let data = req.body;
	let product = productsRef.push();
	let key = product.key;
	data.id = key;

	product.set(data).then(() => {
		productsRef.once('value', (snapshot) => {
			res.send({
				success: true,
				responseText: 'success',
				responseData: snapshot.val(),
			});
			res.end();
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
					responseText: 'success',
					responseData: snapshot.val(),
				});
				res.end();
			});
		});
});

/* delete product */
router.post('/delete-product', function (req, res, next) {
	const id = req.body.id;
	productsRef
		.child(id)
		.remove()
		.then(() => {
			productsRef.once('value', (snapshot) => {
				res.send({
					success: true,
					responseText: 'success',
					responseData: snapshot.val(),
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
		responseText: 'img upload success!',
	});
});

module.exports = router;
