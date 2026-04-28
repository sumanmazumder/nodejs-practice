const express = require('express');

const app = express();
const router = express.Router();

const adminContollers = require('../controllers/admin');

// /admin/add-product => GET
router.get('/add-product', adminContollers.addGetProducts)

// /admin/add-product => POST
router.post('/add-product', adminContollers.addPostProduct)

// /admin/product-list => GET
router.get('/product-list', adminContollers.adminProductList);

// /admin/edit-product => EDIT
router.post('/edit-product', adminContollers.editProduct)



module.exports = router;