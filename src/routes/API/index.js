
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const homeRouter = require('./homeRouter');
const itemsRouter = require('./itemsRouter');

const express = require('express');

const router = express.Router();

router.use('/auth',authRouter)
router.use('/user',userRouter)
router.use('/items',itemsRouter)
router.use('/',homeRouter)
module.exports = router;


