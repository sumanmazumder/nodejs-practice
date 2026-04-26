const express = require('express');
const router = express.Router();
const path = require('path');

const adminRoute = require('./adminRoute');


router.get('/', (req, res, next) => {
    const products = adminRoute.product;
    res.render('shop', {pageTitle: 'Shop', prods: products, path: '/'})
});

module.exports = router;