
const checkUser = require("../app/controllers/checkuser")

const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');


//newcontroller.index
router.get('/users',checkUser.getuser,checkUser.checkAdmin, userController.showLishUser);

module.exports = router;

