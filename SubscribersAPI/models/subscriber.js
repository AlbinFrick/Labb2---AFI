const mongoose = require('mongoose');

const subscriberSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    zipcode: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    subnumber: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Subscriber', subscriberSchema);