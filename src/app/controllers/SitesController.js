
const Item = require('../modals/Item');
// const jwt = require('jsonwebtoken');
// const user = require('../modals/user');
const {mutipleMongooseToObject} = require('../../util/mongoose')
class SitesController{

    // [get] /home
    index(req, res, next){
        //promise
        Item.find({})
            .then(items =>{
                res.render("home",{
                    items: mutipleMongooseToObject(items),
                    // data: res.data
                })
            })
            .catch(next);
        
        //callbacks
            // Course.find({},function(err, courses){
            //     if(!err) {
            //     res.json(courses);
            //     }
            //     else{
            //         next(err)
            //     }
            // })
    }
     // [get] /search
    //  search(req, res){
    //     res.render('search')
    // }
    
}

module.exports = new SitesController();