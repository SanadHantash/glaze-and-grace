const express = require('express');
const router = express.Router();

const productController = require('../Controllers/productController');


router.get('/category/:id', productController.getproduct);
router.get('/product/newproduct',productController.getnewproduct);
router.get('/product/discount',productController.getdiscountproduct);
router.get('/product/toprated',productController.gettopproduct);


module.exports = router;