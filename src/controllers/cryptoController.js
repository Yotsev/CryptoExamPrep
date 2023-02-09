const cryptoController = require('express').Router();

const authMiddleware = require('../middlewares/authMiddleware');
const cryptoService = require('../services/cryptoService');
const { getErrorMessage } = require('../utils/errorParser');

cryptoController.get('/catalog', async (req, res) => {
    const cryptos = await cryptoService.getAllCrypto();
    const isCrypto = cryptos.length;

    res.render('crypto/catalog', {cryptos, isCrypto});
});

cryptoController.get('/create', authMiddleware.isAuthenticated, (req, res) => {
    res.render('crypto/create');
});

cryptoController.post('/create', async (req, res) => {
    const { name, image, price, description, payment } = req.body;
   console.log(req.body);

    try {
        await cryptoService.createCrypto(name, image, price, description, payment, req.user._id);
    } catch (err) {
        return res.status(400).render('crypto/create', {error: getErrorMessage(err)});
    }

    res.redirect('/crypto/catalog');
});

cryptoController.get('/:id/details', authMiddleware.isAuthenticated, async (req, res)=> {
    const crypto = await cryptoService.getOneCrypto(req.params.id);

    if (!crypto) {
        return res.redirect('/404');
    }

    const isOwner = crypto.owner == req.user._id;
    const hasBought = !crypto.buy.includes(req.user._id);

    res.render('crypto/details', {crypto, isOwner, hasBought});
});

module.exports = cryptoController