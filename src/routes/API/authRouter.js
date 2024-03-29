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
 *  description: API FOR AUTH
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          User:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                  password:
 *                      type: string
 *
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          ResponseSuccess:
 *              type: object
 *              properties:
 *                  isSuccess:
 *                      example: true
 *                  message:
 *                      example: Success
 *                  data:
 *                      example: {}
 *
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
 * /api/auth/signup:
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
 *          '200':
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

/**
 * @swagger
 * /auth/resendemail/:
 *  post:
 *      summary: return a verify account
 *      description: verify a your account
 *      tags: [AUTH]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          'email':
 *                              type: string
 *                              example: abc@gmail.com
 *      responses:
 *          '200':
 *              description: create success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ResponseSuccess'
 *          '400':
 *              description: bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ResponseFail'
 *
 */

/**
 * @swagger
 * /auth/verify/:
 *  get:
 *      summary: return verify account
 *      description: verify a your account
 *      tags: [AUTH]
 *      parameters:
 *        - in: query
 *          name: token
 *        - in: query
 *          name: id
 *      responses:
 *          '201':
 *              description: create success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ResponseSuccess'
 *          '400':
 *              description: bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ResponseFail'
 *
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: return token and refreshToken
 *    description: post to login
 *    tags: [AUTH]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              'email':
 *                  type: string
 *                  example: abc@gmail.com
 *              'password':
 *                  type: string
 *                  example: 12345
 *    responses:
 *        '200':
 *            description: ok
 *            content:
 *                application/json:
 *                    schema:
 *                        $ref: '#/components/schemas/ResponseSuccess'
 *        '400':
 *             description: bad request
 *             content:
 *                application/json:
 *                    schema:
 *                        $ref: '#/components/schemas/ResponseFail'
 *
 */

/**
 * @swagger
 * /auth/refreshToken:
 *  post:
 *    summary: return a refreshAccessToken
 *    description: post to sign refresh token
 *    tags: [AUTH]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              "refreshToken":
 *                  type: string
 *                  example: token
 *    responses:
 *        '200':
 *            description: ok
 *            content:
 *                application/json:
 *                    schema:
 *                        $ref: '#/components/schemas/ResponseSuccess'
 *        '400':
 *             description: bad request
 *             content:
 *                application/json:
 *                    schema:
 *                        $ref: '#/components/schemas/ResponseFail'
 */

/**
 * @swagger
 * /auth/updatePW:
 *  patch:
 *    summary: return message success
 *    description: patch to update user
 *    tags: [AUTH]
 *    security:
 *        - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              'oldPW':
 *                  type: string
 *                  example: 12345
 *              'newPW':
 *                  type: string
 *                  example: 123456789
 *              'repeatNewPW':
 *                  type: string
 *                  example: 123456789
 *    responses:
 *        '200':
 *            description: ok
 *            content:
 *                application/json:
 *                    schema:
 *                        $ref: '#/components/schemas/ResponseSuccess'
 *        '400':
 *             description: bad request
 *             content:
 *                application/json:
 *                    schema:
 *                        $ref: '#/components/schemas/ResponseFail'
 */

/**
 * @swagger
 * /auth/forgotPW:
 *  post:
 *    summary: return a link to reset PW
 *    description: post to sign link
 *    tags: [AUTH]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              "email":
 *                  type: string
 *                  example: abc@gmail.com
 *    responses:
 *        '200':
 *            description: ok
 *            content:
 *                application/json:
 *                    schema:
 *                        $ref: '#/components/schemas/ResponseSuccess'
 *        '400':
 *             description: bad request
 *             content:
 *                application/json:
 *                    schema:
 *                        $ref: '#/components/schemas/ResponseFail'
 */

/**
 * @swagger
 * /auth/resetPW/{reset}:
 *  patch:
 *    summary: return a new PW
 *    description: patch to reset PW
 *    tags: [AUTH]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              "newPassword":
 *                  type: string
 *              "repeatNewPassword":
 *                  type: string
 *    parameters:
 *      - in: path
 *        name: reset
 *    responses:
 *        '200':
 *            description: ok
 *            content:
 *                application/json:
 *                    schema:
 *                        $ref: '#/components/schemas/ResponseSuccess'
 *        '400':
 *             description: bad request
 *             content:
 *                application/json:
 *                    schema:
 *                        $ref: '#/components/schemas/ResponseFail'
 *
 */

module.exports = router;
