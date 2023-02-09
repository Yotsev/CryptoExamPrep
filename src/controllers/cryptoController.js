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

module.exports = cryptoController