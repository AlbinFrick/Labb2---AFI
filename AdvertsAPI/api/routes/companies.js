const express = require('express');
const router = express.Router();
const Company = require('../models/companies');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(cors());

router.get('/api/companies/get', (req, res, next) => {
	Company.find()
		.then(doc => {
			console.log('Fetched companies');
			res.status(200).json(doc);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

router.get('/api/companies/get/:id', (req, res, next) => {
	const id = req.params.id;
	Company.findById(id)
		.exec()
		.then(doc => {
			console.log(doc);
			res.status(200).json(doc);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

router.post('/api/companies/add', (req, res, next) => {
	const company = new Company({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.company.name,
		orgNumber: req.body.company.orgNumber,
		phoneNumber: req.body.company.phoneNumber,
		deliverLocation: {
			address: req.body.company.deliverLocation.address,
			zipCode: req.body.company.deliverLocation.zipCode,
			city: req.body.company.deliverLocation.city
		},
		paymentLocation: {
			address: req.body.company.paymentLocation.address,
			zipCode: req.body.company.paymentLocation.zipCode,
			city: req.body.company.paymentLocation.city
		}
	});
	company
		.save()
		.then(result => {
			console.log(result);
		})
		.catch(err => console.log(err));
	res.status(201).json({
		message: 'Handling POST request to /adverts',
		createdCompany: company
	});
});

router.delete('/api/companies/remove/:id', (req, res, next) => {
	const id = req.params.id;
	Company.deleteOne()
		.where('_id')
		.equals(id)
		.then(doc => {
			console.log('Company removed');
			res.status(200).json(doc);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

router.put('/api/companies/update', (req, res, next) => {
	const id = req.body.id;
	Company.updateOne({ _id: id }, { $set: req.body }, { new: true })
		.then(doc => {
			console.log('Company updated');
			res.status(200).json(doc);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

module.exports = router;
