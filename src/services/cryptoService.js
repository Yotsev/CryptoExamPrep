const Crypto = require('../models/Crypto');

exports.create = (ownerId, cryptoData) => Crypto.create({ ...cryptoData, owner: ownerId });

exports.getAll = () => Crypto.find({}).lean();

exports.getOne = (cryptoId) => Crypto.findById(cryptoId).lean();

exports.buy = async (userId, cryptoId) => {
    //Better way
    //Crypto.findByIdAndUpdate(cryptoId,{$push: {buyers: userId}});

    const crypto = await Crypto.findById(cryptoId);

    //TODO: Check if the user bought the crypto
    crypto.buyers.push(userId);

    //We can return it if we need it
    //return crypto.save();

    await crypto.save();
};

exports.edit = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData, {runValidators: true});

exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);

exports.search = async (name, paymentMethod) => {
    let crypto = await this.getAll();

    if (name) {
        crypto = crypto.filter(x=>x.name.toLowerCase() === name.toLowerCase());
    }

    if (paymentMethod) {
        crypto = crypto.filter(x=>x.paymentMethod === paymentMethod);
    }

    return crypto;
}