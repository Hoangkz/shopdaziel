
// // // cấu hình news

const express = require('express');
const router = express.Router();

const sitescontroller2 = require('../app/controllers/SitesController');


// // router.get("/",sitescontroller.home);
router.get("/", sitescontroller2.index);

module.exports = router;

