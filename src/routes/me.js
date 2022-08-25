
const getUser = require("../app/controllers/checkuser")

const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');


//newcontroller.index
router.get('/trash/items',getUser.getuser, meController.trashCourse);

router.get('/stored/items',getUser.getuser, meController.storedCourses);
module.exports = router;

