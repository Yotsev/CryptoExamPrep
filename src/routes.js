const router = require('express').Router();

const authController = require('./controllers/authController');
const homeController = require('./controllers/homeController');
const cryptoController = require('./controllers/cryptoController');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/crypto', cryptoController);
router.all('*', (req, res)=> {
    res.render('home/404');
})
module.exports = router;