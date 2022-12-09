const buyItem = require('../modals/buyItem');
const {MongooseToObject, mutipleMongooseToObject,mongooseToGetLish} = require('../../util/mongoose');
class buyItemController{

    // [get] /home
    index(req, res, next){
        //promise
        console.log(req.body)
        res.json(req.body)
    }

    
}

module.exports = new buyItemController();