
// // cấu hình itemController

const express = require('express');
const router = express.Router();
const checkUser = require("../app/controllers/checkuser")

const itemController = require('../app/controllers/ItemController');


//newcontroller.index

router.get('/:id/edit',checkUser.getuser, itemController.edit);
router.get('/create',checkUser.getuser,checkUser.checkAdmin, itemController.create);
router.post('/formAction', itemController.formAction);

router.post('/store', itemController.store);
router.patch('/:id/restore', itemController.restore);
router.put('/:id', itemController.update);
router.get('/',checkUser.getuser, itemController.search);

router.delete('/:id/permanentlyDelete',checkUser.checkAdmin, itemController.permanentlyDelete);
router.delete('/:id',checkUser.checkAdmin, itemController.delete);


router.get('/danhsachItem/items', itemController.listItems);


router.get('/:loai/show',checkUser.getuser, itemController.showList);
router.get('/:id',checkUser.getuser, itemController.show);

module.exports = router;

