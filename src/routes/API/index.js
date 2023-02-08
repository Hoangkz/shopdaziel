
const authRouter = require('./authRouter');
const buyRouter = require('./buyRouter');
const homeRouter = require('./homeRouter');

const express = require('express');

const router = express.Router();

router.use('/auth',authRouter)
router.use('/',homeRouter)
module.exports = router;


