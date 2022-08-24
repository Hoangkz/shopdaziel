
// cấu hình courseController

const express = require('express');
const router = express.Router();

const meController = require('../controllers/MeController');

//newcontroller.index
router.get('/', meController.show);

module.exports = router;

