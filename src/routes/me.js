
const checkUser = require("../app/controllers/checkuser")

const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');


//newcontroller.index
router.get('/trash/items',checkUser.getuser,checkUser.checkAdmin, meController.trashCourse);

router.get('/stored/items',checkUser.getuser,checkUser.checkAdmin, meController.storedCourses);
module.exports = router;

