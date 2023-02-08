
const authRouter = require('./authRouter');
const homeRouter = require('./homeRouter');
const itemsRouter = require('./itemsRouter');

const express = require('express');

const router = express.Router();

router.use('/auth',authRouter)
router.use('/items',itemsRouter)
router.use('/',homeRouter)
module.exports = router;


