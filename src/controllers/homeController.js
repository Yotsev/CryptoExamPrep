const homeController = require('express').Router();

homeController.get('/', (req, res)=> {
    res.render('home/home');
});

homeController.get('/404', (req, res)=> {
    res.render('home/404');
});

homeController.get('/search', (req, res)=> {
    res.render('home/search');
})

module.exports = homeController;