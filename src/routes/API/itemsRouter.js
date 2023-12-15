
// // cấu hình itemController
const checkAdmin = require("../../app/controllers_API/checkuser").checkAdmin

const express = require('express');
const router = express.Router();

const itemController = require('../../app/controllers_API/ItemController');

// router.get('/:id/edit',checkUser.getuser, itemController.edit);
// router.get('/create',checkUser.getuser,checkUser.checkAdmin, itemController.create);
// router.post('/formAction', itemController.formAction);

// router.post('/store', itemController.store);
// router.patch('/:id/restore', itemController.restore);
// router.put('/:id', itemController.update);
// router.get('/',checkUser.getuser, itemController.search);

// router.delete('/:id/permanentlyDelete',checkUser.checkAdmin, itemController.permanentlyDelete);
// router.delete('/:id',checkUser.checkAdmin, itemController.delete);


// router.get('/danhsachItem/items', itemController.listItems);

router.get('/:loai/show', itemController.showList);
router.post('/list-items', itemController.List_Items);
router.post('/create-items',checkAdmin, itemController.Create_Items);
router.post('/update-items',checkAdmin, itemController.Update_Items);
router.post('/delete-items', itemController.Delete_Items);
router.get('/searchClient', itemController.searchClient);
router.get('/search', itemController.search);
router.get('/:id', itemController.show);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: PRODUCT
 *  description: API OF PRODUCT
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  barCode:
 *                      type: string
 *                  priceImport:
 *                      type: double
 *                  priceSelling:
 *                      type: double
 *                  weight:
 *                      type: integer
 *                  quantity:
 *                      type: integer
 *                  description:
 *                      type: string
 *                  image:
 *                      type: array
 *                      items:
 *                          type: file
 *                          fomart: binary
 *                  categoryId:
 *                      type: string
 *
 */

/**
 * @swagger
 * /product/:
 *  post:
 *      summary: create a new product
 *      description: post a new product
 *      tags: [PRODUCT]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
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
 *          '400':
 *              description: bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ResponseFail'
 */

/**
 * @swagger
 * /product/:
 *  get:
 *      summary: return list of the product
 *      description: get all product
 *      tags: [PRODUCT]
 *      parameters:
 *        - in: query
 *          name: search
 *        - in: query
 *          name: category
 *        - in: query
 *          name: page
 *        - in: query
 *          name: title
 *        - in: query
 *          name: type
 *      responses:
 *          '200':
 *              description: ok
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
 *          '400':
 *              description: bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ResponseFail'
 */

/**
 * @swagger
 * /product/{id}:
 *  get:
 *      summary: return a product
 *      description: get a product by id
 *      tags: [PRODUCT]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
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
 * /product/deletesoft/:
 *  delete:
 *      summary: delete soft product
 *      description: delete soft a product by ids
 *      tags: [PRODUCT]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          ids:
 *                              type: string
 *      responses:
 *          '200':
 *              description: update product successful
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
 * /product/:
 *  delete:
 *      summary: delete hard product
 *      description: delete a product by ids
 *      tags: [PRODUCT]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          ids:
 *                              type: string
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
 * /product/{id}:
 *  patch:
 *      summary: update a product
 *      description: update a product by id
 *      tags: [PRODUCT]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: id of product
 *          schema:
 *              type: string
 *          required: true
 *      responses:
 *          '200':
 *              description: update product successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ResponseSuccess'
 */