
const checkUser = require("../app/controllers/checkuser")

const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');


//newcontroller.index
router.get('/trash/items',checkUser.getuser,checkUser.checkAdmin, meController.trashItem);
router.get('/stored/items',checkUser.getuser,checkUser.checkAdmin, meController.storedItem);
module.exports = router;

