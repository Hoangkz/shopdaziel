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

/**
 * @swagger
 * tags:
 *  name: USER
 *  description: API OF USER
 */

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http 
 *          scheme: bearer
 *          bearerFormat: JWT    
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
 *                  email: 
 *                      type: string
 *                  password: 
 *                      type: string
 *                  age:
 *                      type: integer
 *                  address: 
 *                      type: string
 *                  phone:
 *                      type: string
 *                  
 */

/**
 * @swagger
 * /user/:
 *  get:
 *      summary: return list of the user
 *      description: get all user 
 *      tags: [USER]
 *      security: 
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: page
 *        - in: query
 *          name: title
 *        - in: query
 *          name: type
 *        - in: query
 *          name: status
 *      responses:
 *          '200': 
 *              description: ok
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
 */

/**
 * @swagger
 * /user/getme:
 *  get:
 *      summary: return a user
 *      description: get a user by id
 *      tags: [USER]
 *      security: 
 *        - bearerAuth: []
 *      responses:
 *          '200': 
 *              description: ok
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
 */

/**
 * @swagger
 * /user/{id}:
 *  delete:
 *      summary: delete hard user
 *      description: delete a user by id
 *      tags: [USER]
 *      security: 
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: id of user
 *          schema:
 *              type: string
 *          required: true
 *      responses:
 *          '204':
 *              description: delete success
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
 * /user/deletesoft/{id}:
 *  delete:
 *      summary: delete soft user
 *      description: delete soft a user by id
 *      tags: [USER]
 *      security: 
 *        - bearerAuth: []
 *      parameters: 
 *        - in: path
 *          name: id
 *          description: id of user
 *          schema:
 *              type: string
 *          required: true
 *      responses:
 *          '200':
 *              description: update user successful
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
 */

/**
 * @swagger
 * /user/{id}:
 *  patch:
 *      summary: update a user
 *      description: update a user by id
 *      tags: [USER]
 *      security: 
 *        - bearerAuth: []
 *      requestBody:
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *                      
 *      parameters: 
 *        - in: path
 *          name: id
 *          description: id of user
 *          schema:
 *              type: string
 *          required: true
 *      responses:
 *          '200':
 *              description: update user successful
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
 */