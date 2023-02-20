const express = require('express');

const router = express.Router();

const AuthController = require('../../app/controllers_API/AuthController');
// đăng ký đăng nhập
router.post('/refresh-token', AuthController.refreshToken);
router.post('/logout', AuthController.logout);
router.post('/token', AuthController.accessToken);
router.post('/login', AuthController.setLogin);
router.post('/signup', AuthController.saveAccount);
router.post('/user/:id', AuthController.saveProfile);


module.exports = router;

