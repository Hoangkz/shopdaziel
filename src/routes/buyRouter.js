
const checkUser = require("../app/controllers/checkuser")

const express = require('express');
const router = express.Router();

const buyItemController = require('../app/controllers/buyItemController');


//newcontroller.index

router.post('/items',buyItemController.index);
module.exports = router;

