const express = require('express');
const router = express.Router();
const shoppingController = require('../Controllers/shoppingController');
const middleware = require('../middleware/authorization');
router.post('/addtocart/:id', middleware.authorize,shoppingController.addtocart);
router.get('/shoppingcart', middleware.authorize,shoppingController.getcartproducts);
router.get('/shoppingcart/totalprice',middleware.authorize, shoppingController.totalprice);
router.delete('/product/delete/:id', middleware.authorize,shoppingController.deleteproduct);
router.put('/product/update/:id', middleware.authorize,shoppingController.updateproduct);
router.post('/shoppingcart/checkout', middleware.authorize,shoppingController.createCheckoutSession);


module.exports = router;