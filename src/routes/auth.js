const express = require('express');
const getUser = require("../app/controllers/checkuser")

const router = express.Router();

const AuthController = require('../app/controllers/AuthController');

router.get('/login', AuthController.login);
router.post('/login', AuthController.setLogin);
router.post('/logout', AuthController.logout);
router.get('/signup', AuthController.signup);
router.post('/signup', AuthController.saveAccount);

router.get('/user',getUser.checklogin, getUser.getuser,AuthController.getuser);


module.exports = router;

