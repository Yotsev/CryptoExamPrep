const cryptoRouter = require('express').Router();

const { isAuthenticated } = require('../middlewares/authMiddleware');
const cryptoService = require('../services/cryptoService');
const { getErrorMessage } = require('../utils/errorParser');
const { getPaymentMethodViewData } = require('../utils/viewDataUtils');

//Get Create Page
cryptoRouter.get('/create', isAuthenticated, (req, res) => {
    res.render('crypto/create');
});

//Post Create Page
cryptoRouter.post('/create', isAuthenticated, async (req, res) => {
    const cryptoData = req.body;

    try {

        await cryptoService.create(req.user._id, cryptoData);
    } catch (err) {

        console.log(getErrorMessage(err));
        return res.status(400).render('crypto/create', { error: getErrorMessage(err) });
    }

    res.redirect('/crypto/catalog');
});

//Get Catalog Page
cryptoRouter.get('/catalog', async (req, res) => {
    const crypto = await cryptoService.getAll();

    res.render('crypto/catalog', { crypto })
});

//Get Details Page
cryptoRouter.get('/:cryptoId/details', async (req, res) => {
    const id = req.params.cryptoId;
    const crypto = await cryptoService.getOne(id);
    const isOwner = crypto.owner == req.user?._id;
    const isBuyer = crypto.buyers?.some(id => id == req.user._id);

    res.render('crypto/details', { crypto, isOwner, isBuyer });
});

//Get Edit Page
cryptoRouter.get('/:cryptoId/edit', isAuthenticated, async (req, res) => {
    const crypto = await cryptoService.getOne(req.params.cryptoId);

    if (crypto.owner != req.user._id) {
        return res.redirect('home/404');
    }

    const paymentMethods = getPaymentMethodViewData(crypto.paymentMethod);

    res.render('crypto/edit', { crypto, paymentMethods });
});

//Post Edit Page
cryptoRouter.post('/:cryptoId/edit', isAuthenticated, async (req, res) => {
    const cryptoData = req.body;
    const crypto = await cryptoService.edit(req.params.cryptoId, cryptoData);

    if (crypto.owner != req.user._id) {
        return res.redirect('/home/404');
    }

    res.redirect(`/crypto/${req.params.cryptoId}/details`);
});

//Get Delete Page
cryptoRouter.get('/:cryptoId/delete', isAuthenticated, async (req, res) => {
    const crypto = await cryptoService.getOne(req.params.cryptoId);

    if (crypto.owner != req.user._id) {
        return res.redirect('/home/404');
    }

    await cryptoService.delete(req.params.cryptoId);

    res.redirect('/crypto/catalog');
});

//Get Buy Page
cryptoRouter.get('/:cryptoId/buy', isAuthenticated, async (req, res) => {
    
    try{
        await cryptoService.buy(req.user._id, req.params.cryptoId);

    }catch (err){
        return res.status(400).render('home/404', {error: getErrorMessage(err)}); // Or redirect without message
    }

    res.redirect(`/crypto/${req.params.cryptoId}/details`);
});

cryptoRouter.get('/search', isAuthenticated, async (req, res) => {
    const { name, paymentMethod } = req.query;
    const crypto = await cryptoService.search(name, paymentMethod);
    const paymentMethods = getPaymentMethodViewData(paymentMethod);
    
    res.render('crypto/search', { crypto, paymentMethods, name});
});

module.exports = cryptoRouter;