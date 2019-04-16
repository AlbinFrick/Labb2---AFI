const mongoose = require('mongoose');

const advertSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	price: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	adPrice: {
		type: String,
		required: true
	},
	subscriber: {
		type: Boolean,
		required: true
	},
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}
});

module.exports = mongoose.model('Advert', advertSchema);
