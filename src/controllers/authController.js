const authController = require('express').Router();
const authService = require('../services/authService');

authController.get('/register', (req, res)=> {
    res.render('auth/register');
});

authController.post('/register', async (req, res)=> {
    const {username, email, password, repeatPassword} = req.body;

    await authService.register(username, email, password, repeatPassword);

    res.redirect('/');
});


authController.get('/login', (req, res)=> {
    res.render('auth/login');
});

authController.post('/login', async (req, res)=> {
    const {email, password} = req.body;

    const token = await authService.login(email,password);

    res.cookie('auth', token);
    res.redirect('/');
});

authController.get('/logout', (req, res)=> {
    res.clearCookie('auth');
    res.redirect('/');
});


module.exports = authController;