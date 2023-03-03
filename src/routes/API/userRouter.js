const express = require('express');

const router = express.Router();

const UserController = require('../../app/controllers_API/UserController');
// đăng ký đăng nhập

router.post('/forgotPassword', UserController.forgotPassword);
router.post('/show-list', UserController.showLishUser);
router.post('/show-user', UserController.showUser);
router.post('/delete-user', UserController.deleteAccount);
router.post('/update', UserController.updateUser);
router.post('/changePassword', UserController.changePassword);


module.exports = router;

