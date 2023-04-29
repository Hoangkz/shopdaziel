
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

/**
 * @swagger
 * tags:
 *  name: Items
 *  description: API for Items
 */

module.exports = router;

