const cryptoController = require('express').Router();

cryptoController.get('/catalog', (req, res)=> {
    res.render('crypto/catalog');
});


module.exports = cryptoController