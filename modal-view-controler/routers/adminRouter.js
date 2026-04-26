const express = require('express');

const app = express();
const router = express.Router();

const productContollers = require('../controllers/product');

router.get('/add-product', productContollers.addGetProducts)

router.post('/add-product', productContollers.addPostProduct)

module.exports = router;