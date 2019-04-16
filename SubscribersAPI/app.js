const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Subscriber = require('./models/subscriber');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('short'));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/Subscribers', {
	useNewUrlParser: true
});

app.get('/', (req, res) => {
	res = allowCORS(res);
	res.json({
		message: 'tjena'
	});
});

app.get('/api/subscribers/get/', (req, res) => {
	res = allowCORS(res);
	Subscriber.find()
		.exec()
		.then(docs => {
			res.json(docs);
		})
		.catch(err => {
			res.status(400).send('Failed to get subscribers. \n Error: ' + err);
		});
});

app.get('/api/subscribers/get/:subid', (req, res) => {
	res = allowCORS(res);
	Subscriber.find()
		.where('subnumber')
		.equals(req.params.subid)
		.exec()
		.then(docs => {
			res.json(docs[0]);
		})
		.catch(err => {
			res.status(400).send('Failed to get subscriber. \n Error: ' + err);
		});
});

app.put('/api/subscribers/update', (req, res) => {
	console.log(req.body);
	res = allowCORS(res);
	Subscriber.updateOne({ _id: req.body.id }, { $set: req.body })
		.then(docs => {
			res.status(200).send('Successfully updated subscriber.');
		})
		.catch(err => {
			res.status(400).send('Failed to get subscriber. \n Error: ' + err);
		});
});

app.post('/api/subscribers/add', (req, res) => {
	res = allowCORS(res);
	const subscriber = new Subscriber({
		_id: new mongoose.Types.ObjectId(),
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		phonenumber: req.body.phonenumber,
		address: req.body.address,
		zipcode: req.body.zipcode,
		city: req.body.city,
		subnumber: req.body.subnumber
	});

	subscriber
		.save()
		.then(result => {
			res.status(200).send('Successfully added subscriber.');
		})
		.catch(err => {
			res.status(400).send('Failed to add subscriber. \n Error: ' + err);
		});
});

app.delete('/api/subscribers/remove/:id', (req, res) => {
	res = allowCORS(res);
	Subscriber.deleteOne()
		.where('_id')
		.equals(req.params.id)
		.exec()
		.then(result => {
			res.status(200).send('Successfully removed subscriber.');
		})
		.catch(err => {
			res.status(400).send(
				'Failed to remove subscriber. \n Error: ' + err
			);
		});
});

function allowCORS(res) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	return res;
}

app.listen(8000, () => {
	console.log('Listening on 8000.');
});
