const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const rootPath = require('../utile/path');

const product = [];

router.get('/add-product', (req, res, next) => {
    res.render('add-product', { pageTitle: 'Add Product', path: "/admin/add-product" })
});

router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    product.push({ title: req.body.title });
    // fs.writeFile('product-list.txt', req.body.title, (err)=>{
    //     if(err){
    //         console.error(err);
    //         res.setHeader({'content-type': 'text/html'});
    //         res.writeHead(302, {'content-type': 'text/html'});
    //     }
    // })
    res.redirect('/');
})

// module.exports = router;
exports.routes = router;
exports.product = product;