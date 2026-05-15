const express = require('express');

const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/add-product', adminController.getAddproduct);
router.post('/add-product', adminController.postAddProduct);

router.get('/product-list', adminController.getProducts);

router.get('/edit-product/:prodId', adminController.getEditAdminProduct);
router.post('/edit-product', adminController.postEditAdminProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;