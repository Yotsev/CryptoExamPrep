const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    image: {
        type: String,
        required: [true, 'Image link is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price link is required'],
    },
    paymentMethod: {
        type: String,
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
        required: [true, 'Price link is required'],
    },
    buy: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;