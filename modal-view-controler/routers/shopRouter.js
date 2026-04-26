const express = require('express');

const app = express();
const router = express.Router();
// const productAdmin = require('./adminRouter');
const productController = require('../controllers/product')

router.get('/', productController.getProduct)

module.exports = router;