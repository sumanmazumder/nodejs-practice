const express = require('express');
const router = express.Router();
const http = require('path');
const path = require('path');

const app = express();

let product = [];
router.get('/add-product', (req, res, next) => {
    res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product', formCss: true, productCSS: true, activeProduct: true })
});


router.post('/add-product', (req, res, next) => {
    product.push({ title: req.body.title });
    res.redirect('/');
});


exports.routes = router;
exports.product = product;