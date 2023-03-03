
const checkAdmin = require("../../app/controllers_API/checkuser").checkAdmin

const express = require('express');
const router = express.Router();

const buyItemController = require('../../app/controllers_API/buyItemController');


router.post('/delete-carts',buyItemController.DeleteCart);
router.post('/cart-items',buyItemController.AddCartItems);
router.post('/buys-carts',buyItemController.BuysCartItems);
router.get('/order-carts',buyItemController.CartOrder);
router.post('/admin-order-carts',checkAdmin,buyItemController.AdminCartOrder);
router.post('/ship-carts',checkAdmin,buyItemController.ShipCarts);
router.post('/cancel-order-carts',buyItemController.CancelCartOrder);
router.get('/list-carts',buyItemController.CartItems);
module.exports = router;

