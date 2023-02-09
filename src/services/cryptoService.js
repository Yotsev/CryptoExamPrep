const Crypto = require('../models/Crypto');

exports.createCrypto = async (name, image, price, description, payment, owner)=> {
    await Crypto.create({name, image, price, description, paymentMethod: payment, owner});
};

exports.getAllCrypto = async ()=> {
    const crypto = await Crypto.find({}).lean();

    return crypto;
}