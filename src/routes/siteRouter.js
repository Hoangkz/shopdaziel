
// // // cấu hình news

const express = require('express');
const router = express.Router();

const sitescontroller = require('../app/controllers/SitesController');


router.get("/", sitescontroller.index);

module.exports = router;

