


const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');


//newcontroller.index
router.get('/trash/items', meController.trashCourse);

router.get('/stored/items', meController.storedCourses);
module.exports = router;

