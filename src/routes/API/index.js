
const api = require('./Api');

const express = require('express');

const router = express.Router();

router.use('/',api)

module.exports = router;


