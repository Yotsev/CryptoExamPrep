const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'Name should be at least 2 characters long'],
    },
    image: {
        type: String,
        required: true,
        match: [/^https?:\/\//, 'Invalid image URL'],
        // validate: {
        //     validator: function(value){
        //         return value.startsWith('http://') ||value.startsWith('https://');
        //     },
        //     message: 'Invaild Url'
        // }
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price should be positive'],
        // Min value validate
        // validate: {
        //     validator: function (value) {
        //         return value > 0;
        //     },
        //     message: 'Price must be positive number'
        // },
    },
    description: {
        type: String,
        required: true,
        minLength: [10, 'Description should be at least 10 characters long'],
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: {
            values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
            message: 'Invalid payment method'
        }
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    buyers: [{
        type: mongoose.Types.ObjectId,
        res: 'User',
    }],
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;