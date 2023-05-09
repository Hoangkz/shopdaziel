const express = require('express');
const getUser = require("../app/controllers/checkuser")

const router = express.Router();
const passport = require("passport");

const AuthController = require('../app/controllers/AuthController');

router.get('/login', AuthController.login);
router.post('/login', AuthController.setLogin);
router.post('/logout', AuthController.logout);
router.get('/signup', AuthController.signup);
router.post('/signup', AuthController.saveAccount);
router.post('/user/:id', AuthController.saveProfile);

router.get('/user',getUser.checklogin, getUser.getuser,AuthController.getuser);

// const CLIENT_URL = "http://localhost:3000/";

// router.get("/login/success", (req, res) => {
//   if (req.user) {
//     res.status(200).json({
//       success: true,
//       message: "successfull",
//       user: req.user,
//       //   cookies: req.cookies
//     });
//   }
// });

// router.get("/login/failed", (req, res) => {
//   res.status(401).json({
//     success: false,
//     message: "failure",
//   });
// });

// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect(CLIENT_URL);
// });

// router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

// router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: AUTH
 *  description: API for Auth
 */


/**
 * @swagger
 * /auth/signup:
 *  post:
 *      summary: return a new user
 *      description: post a new user
 *      tags: [AUTH]
 *      requestBody: 
 *          content: 
 *              application/json:
 *                  schema:
*                          properties:     
*                              Tên tài khoản: 
*                                  example: admin
*                              Mật khẩu: 
*                                  example: hoang1
 *      responses:
 *          '201':
 *              description: create success
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:     
 *                              isSuccess: 
 *                                  example: true
 *                              message: 
 *                                  example: Created successfully
 *                              data: 
 *                                  example: {}                          
 *                         
 *          '400':
 *              description: bad request
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ResponseFail'
 */