const express = require('express');

const router = express.Router();
const shopController = require('../controllers/shop')

// /Shop intial first page 
router.get('/', shopController.getIndex);

// /shop product list page
router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct) // product details

// /shop cart page
router.get('/cart', shopController.getCard);

router.post('/cart', shopController.postCard);

router.get('/orders', shopController.getOrders);


// /shop checkout page
router.get('/checkout', shopController.getCheckout);




module.exports = router;