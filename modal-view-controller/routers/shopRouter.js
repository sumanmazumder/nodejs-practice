const express = require('express');

const app = express();
const router = express.Router();
const shopController = require('../controllers/shop')

// /Shop intial first page 
router.get('/', shopController.getIndex);

// /shop product list page
router.get('/products', shopController.getProduct);

// /shop cart page
router.get('/cart', shopController.getCard);

// /shop checkout page
router.get('/checkout', shopController.getCheckout);


router.get('/orders', shopController.getOrders);

module.exports = router;