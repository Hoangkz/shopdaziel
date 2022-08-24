
// // cấu hình courseController

const express = require('express');
const router = express.Router();

// const meController = require('../app/controllers/MeController');
const meController = require('../app/controllers/MeController2');

//newcontroller.index
router.get('/', meController.show);
// router.get('/trash/items', meController.trashCourse);

// router.get('/stored/items', meController.storedCourses);




module.exports = router;

