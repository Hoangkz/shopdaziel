
const Item = require('../modals/Item');
// const jwt = require('jsonwebtoken');
// const user = require('../modals/user');
const {mutipleMongooseToObject} = require('../../util/mongoose')
class SitesController{

    // [get] /home
    index(req, res, next){
        //promise
        let page =(parseInt(req.query.page)-1)||0;
        let pageSize = 8
        Item.find({}).skip(pageSize*page).limit(pageSize)
            .then(items =>{
                Item.countDocuments({})
                .then((total)=>{
                    res.render("home",{
                        items: mutipleMongooseToObject(items),
                        data: res.data,
                        pageLength: (Math.ceil((total)/pageSize)),
                        currentPage:(page+1)
                    })
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