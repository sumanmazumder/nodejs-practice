const express = require('express');

const router = express.Router();
const shopController = require('../controllers/shopController');


router.get('/', shopController.getIndex);
router.get('/product-list', shopController.getProductList);
router.get('/product-details/:prodId', shopController.getProductDetails);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.post('/create-order', shopController.postOrder)
router.get('/order', shopController.getOrder)

module.exports = router;