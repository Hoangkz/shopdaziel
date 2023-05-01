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


/**
 * @swagger
 * tags:
 *  name: AUTH
 *  description: API for Auth
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          ResponseFail:
 *              type: object
 *              properties:     
 *                  isSuccess: 
 *                      example: false
 *                  errorCode: 
 *                      example: string
 *          
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *      summary: return a new user
 *      description: post a new user
 *      tags: [AUTH]
 *      requestBody: 
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
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

module.exports = router;

