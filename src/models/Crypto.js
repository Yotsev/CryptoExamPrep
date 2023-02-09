const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [2, 'Name shouold be at least 2 characters long'],
    },
    image: {
        type: String,
        required: [true, 'Image link is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        validate: {
            validator: function (value) {
                return value > 0;
            },
            message: 'Price must be positive number'
        },
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [10, 'description must be at least 10 characters long']
    },
    paymentMethod: {
        type: String,
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
        required: [true, 'Paymentmethod is required'],
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