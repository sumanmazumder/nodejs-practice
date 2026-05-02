const express = require('express');

const app = express();
const router = express.Router();

const adminContollers = require('../controllers/admin');

// /admin/add-product => GET
router.get('/add-product', adminContollers.getAddProduct)

// /admin/add-product => POST
router.post('/add-product', adminContollers.postAddProduct)

// /admin/product-list => GET
router.get('/product-list', adminContollers.getProduct);

// /admin/edit-product => GET
router.get('/edit-product/:productId', adminContollers.getEditProduct)

// /admin/edit-product => POST
router.post('/edit-product', adminContollers.editProduct)



module.exports = router;