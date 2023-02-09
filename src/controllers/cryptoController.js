const cryptoController = require('express').Router();

cryptoController.get('/catalog', (req, res)=> {
    res.render('crypto/catalog');
});

cryptoController.get('/create', (req, res)=> {
    res.render('crypto/create');
});

module.exports = cryptoController