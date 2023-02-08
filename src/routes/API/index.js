
const authRouter = require('./authRouter');
const buyRouter = require('./buyRouter');

const express = require('express');

const router = express.Router();

router.use('/auth',authRouter)
module.exports = router;


