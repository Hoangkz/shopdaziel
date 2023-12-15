
const checkAdmin = require("../../app/controllers_API/checkuser").checkAdmin

const express = require('express');
const router = express.Router();

const buyItemController = require('../../app/controllers_API/buyItemController');


router.post('/delete-carts',buyItemController.DeleteCart);
router.post('/cart-items',buyItemController.AddCartItems);
router.post('/buys-carts',buyItemController.BuysCartItems);
router.get('/order-carts',buyItemController.CartOrder);
router.post('/admin-order-carts',checkAdmin,buyItemController.AdminCartOrder);
router.post('/ship-carts',checkAdmin,buyItemController.ShipCarts);
router.post('/cancel-order-carts',buyItemController.CancelCartOrder);
router.get('/list-carts',buyItemController.CartItems);

router.get('/momo',buyItemController.getQRCodeMoMo);
router.get('/bidv',buyItemController.getQRCodeBIDV);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: BUYITEMS
 *  description: API OF BUY ITEMS
 */

/**
 * @swagger
 *  components:
 *      schemas:    
 *          BUYITEMS:
 *              type: object
 *              properties:     
 *                  id_user: 
 *                      type: string
 *                  id_item: 
 *                      type: string
 *                  soluong: 
 *                      type: int
 *                  buy: 
 *                      type: boolean
 *                  status: 
 *                      type: string
 * 
 *                  
 */

/**
 * @swagger
 * /cart-items/:
 *  post:
 *      summary: Thêm một đơn hàng vào giỏ hàng
 *      tags: [BUYITEMS]
 *      security: 
 *          - bearerAuth: []
 *      requestBody: 
 *          content: 
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/BUYITEMS'
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
 * /buys-carts/:
 *  post:
 *      summary: Mua đơn hàng
 *      description: Chuyển đơn hàng sang trạng thái 2, buy = true
 *      tags: [BUYITEMS]
 *      security: 
 *        - bearerAuth: []
 *     
 *      requestBody: 
 *          content: 
 *              application/json:
 *                  schema:
 *                      properties:
 *                          id:
 *                              type: string
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
 * /order-carts:
 *  Post:
 *      summary: return a category
 *      description: get a category by id
 *      tags: [BUYITEMS]
 *      security: 
 *        - bearerAuth: []
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
 * /category/deletesoft/:
 *  delete:
 *      summary: delete soft flash sale
 *      description: delete soft a category by ids
 *      tags: [BUYITEMS]
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
 *              description: update category successful
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
 * /category/:
 *  delete:
 *      summary: delete hard category
 *      description: delete a category by ids
 *      tags: [BUYITEMS]
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
 * /category/{id}:
 *  patch:
 *      summary: update a category
 *      description: update a category by id
 *      tags: [BUYITEMS]
 *      security: 
 *        - bearerAuth: []
 *      requestBody:
 *          content: 
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/BUYITEMS'
 *      parameters: 
 *        - in: path
 *          name: id
 *          description: id of category
 *          schema:
 *              type: string
 *          required: true
 *      responses:
 *          '200':
 *              description: update category successful
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