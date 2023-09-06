
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const homeRouter = require('./homeRouter');
const itemsRouter = require('./itemsRouter');
const buyRouter = require('./buyRouter');

const express = require('express');
const checkUser = require("../../app/controllers_API/checkuser").checkUser

const router = express.Router();

router.use('/auth',authRouter)
router.use('/user',userRouter)
router.use('/items',itemsRouter)
router.use('/buys',buyRouter)
router.use('/',homeRouter)
module.exports = router;


