
const checkUser = require("../app/controllers/checkuser")

const express = require('express');
const router = express.Router();

const buyItemController = require('../app/controllers/buyItemController');


//newcontroller.index

router.post('/items',buyItemController.AddCart);
router.delete('/:id',buyItemController.delete);
router.get('/cart',buyItemController.ShopCart);
router.get('/cart-orders',buyItemController.OrdersCart);
router.post('/formAction',buyItemController.formAction);
module.exports = router;

