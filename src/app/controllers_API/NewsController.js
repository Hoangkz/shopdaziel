// const Course = require('../modals/Item');
// const jwt = require('jsonwebtoken');
// const user = require('../modals/user')
// const {mutipleMongooseToObject} = require('../../util/mongoose')

class NewsController{

    // [get] /news
    index(req, res){
        res.json('news')
    }

    show(req,res){
        res.json("news show")
    }



}

module.exports = new NewsController();