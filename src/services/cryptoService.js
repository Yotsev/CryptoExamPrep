const Crypto = require('../models/Crypto');

exports.createCrypto = async (name, image, price, description, payment, owner)=> {
    await Crypto.create({name, image, price, description, payment, owner});
};

exports.getAllCrypto = async ()=> {
    const crypto = await Crypto.find({}).lean();

    return crypto;
};

exports.getOneCrypto = async (id)=> {
    const crypto = await Crypto.findById(id).populate('buy').lean();
    
    return crypto;
};

exports.cryptoUpdate = async (cryptoId, data)=> {
    await Crypto.findByIdAndUpdate(cryptoId, data, {runValidators: true});
} 