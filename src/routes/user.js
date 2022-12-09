
const checkUser = require("../app/controllers/checkuser")

const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');


//newcontroller.index
router.get('/list-users',checkUser.getuser,checkUser.checkAdmin, userController.showLishUser);
router.get('/:id',checkUser.getuser,checkUser.checkAdmin, userController.showUser);
router.post('/changePassword/:id',userController.changePassword);

module.exports = router;

