let Course = require('../modals/Item');
let jwt = require('jsonwebtoken');
let user = require('../modals/user')
let {mutipleMongooseToObject} = require('../../util/mongoose')

class NewsController{

    // [get] /news
    index(req, res){
        res.render('news')
    }

    show(req,res){
        res.send("news show")

    }



}

module.exports = new NewsController();