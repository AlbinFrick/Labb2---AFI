const express = require('express');
const router = express.Router();
const Advert = require('../models/adverts');
const Cors = require('cors');
const mongoose = require('mongoose');

router.use(Cors());

router.get('/api/adverts/get', (req, res, next) => {
	Advert.find()
		.then(doc => {
			console.log('Fetched adverts');
			res.status(200).json(doc);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

router.get('/api/adverts/get/:id', (req, res, next) => {
	const id = req.params.id;
	Advert.findById(id)
		.then(doc => {
			console.log('Fetched adverts');
			res.status(200).json(doc);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

router.post('/api/adverts/add', (req, res, next) => {
	const advert = new Advert({
		_id: new mongoose.Types.ObjectId(),
		price: req.body.price,
		title: req.body.title,
		content: req.body.content,
		adPrice: req.body.adPrice,
		subscriber: req.body.subscriber,
		postedBy: req.body.postedBy
	});
	advert
		.save()
		.then(result => {
			res.status(201).json({
				message: 'Added advert successfully',
				createdAdvert: advert
			});
		})
		.catch(err => console.log(err));
});

router.delete('/api/adverts/remove/:id', (req, res, next) => {
	const id = req.params.id;
	Advert.deleteOne()
		.where('_id')
		.equals(id)
		.then(doc => {
			console.log('Advert removed');
			res.status(200).json(doc);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

router.put('/api/adverts/update', (req, res, next) => {
	const id = req.body.id;
	Advert.updateOne({ _id: id }, { $set: req.body }, { new: true })
		.then(doc => {
			console.log('Advert updated');
			res.status(200).json(doc);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

module.exports = router;
