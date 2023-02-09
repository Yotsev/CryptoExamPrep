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

exports.deleteCrypto = async(cryptoId)=> {
    await Crypto.findByIdAndDelete(cryptoId);
}

exports.buyCrypto = async (cryptoId, userId) => {
    const crypto = await Crypto.findById(cryptoId);

    if (crypto.buy.includes(userId)) {
        throw new Error('Cannot buy twice');
    }

    crypto.buy.push(userId);
    await crypto.save();
}