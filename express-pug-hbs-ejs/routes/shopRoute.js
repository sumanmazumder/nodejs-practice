const express = require('express');
const path = require('path');


const app = express();
const router = express.Router();

const adminRouter = require('./adminRoute')

router.get("/", (req, res, next) => {
    const products = adminRouter.product;
    res.render('shop', { pageTitle: 'Add Product', prods: products, hasProduct: products.length > 0, path: '/', productCSS: false, activeProduct: true, formCss: true })
});

// exports.routes = router;
module.exports = router