const authController = require('express').Router();

authController.get('/register', (req, res)=> {
    res.render('auth/register');
});

authController.get('/login', (req, res)=> {
    res.render('auth/login');
});

module.exports = authController;