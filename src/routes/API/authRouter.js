const express = require('express');

const router = express.Router();

const AuthController = require('../../app/controllers_API/AuthController');
// đăng ký đăng nhập
router.post('/logout', AuthController.logout);
router.post('/token', AuthController.accessToken);
router.post('/login', AuthController.setLogin);
router.post('/signup', AuthController.saveAccount);
router.post('/user/:id', AuthController.saveProfile);
router.post('/refresh-token', AuthController.refreshToken);


module.exports = router;

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Regester a new user
 *     description: Save a new user account with a unique username.
 *     tags:
 *       - Auth
 *     consumes:
 *       - application/x-www-form-urlencoded  # Để xác định rằng yêu cầu sẽ sử dụng form URL-encoded
 *     parameters:
 *       - in: formData
 *         name: username
 *         description: Tên người dùng
 *         required: true
 *         type: string
 *       - in: formData
 *         name: password
 *         description: Mật khẩu
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Thành công
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       400:
 *         description: Yêu cầu không hợp lệ
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       500:
 *         description: Lỗi máy chủ
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */