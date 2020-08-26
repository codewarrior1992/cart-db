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
			message: 'get products success',
			result: snapshot.val(),
		});
		res.end();
	});
});

/* create product */
router.post('/post-product', function (req, res, next) {
	let data = req.body.data;
	let product = productsRef.push();
	let key = product.key;

	data.id = key;
	data.time = Date.now();

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
router.post('/delete-product', function (req, res, next) {
	const id = req.body.id;
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

const rwdProductsRef = firebaseDb.ref('/rwd-products');

// ##########// 響應式設計 ##########//
router.get('/get', function (req, res, next) {
	rwdProductsRef.once('value', (snapshot) => {
		res.send({
			success: true,
			message: 'get products success',
			result: snapshot.val(),
		});
		res.end();
	});
});

router.post('/post', function (req, res, next) {
	let data = req.body.data;
	let product = rwdProductsRef.push();
	let key = product.key;

	data.id = key;
	data.time = Date.now();

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

module.exports = router;
