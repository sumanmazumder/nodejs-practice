const express = require('express');

const router = express.Router();

const adminControllers = require('../controllers/admin');

// /admin/add-product => GET
router.get('/add-product', adminControllers.getAddProduct)

// /admin/add-product => POST
router.post('/add-product', adminControllers.postAddProduct)

// /admin/product-list => GET
router.get('/product-list', adminControllers.getProduct);

// /admin/edit-product => GET
router.get('/edit-product/:productId', adminControllers.getEditProduct)

// /admin/edit-product => POST
router.post('/edit-product', adminControllers.postEditProduct)

router.post('/delete-product', adminControllers.postDeleteProduct)

module.exports = router;