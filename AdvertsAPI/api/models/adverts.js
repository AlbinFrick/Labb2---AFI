const mongoose = require('mongoose');

const advertSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    price: {
        type: Number,
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
        type: Number,
        required: true
    },
    subscriber: {
        type: Boolean,
        required: true
    },
    postedBy: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Advert', advertSchema);