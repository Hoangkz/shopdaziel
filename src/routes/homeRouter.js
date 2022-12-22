
// // // cấu hình news

const express = require('express');
const router = express.Router();

const Home = require('../app/controllers/homeController');


router.get("/", Home.index);

module.exports = router;

