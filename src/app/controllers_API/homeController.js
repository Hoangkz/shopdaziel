
const Item = require('../modals/Item');
const {mutipleMongooseToObject} = require('../../util/mongoose')
class homeController{

    // [get] /home
    index(req, res, next){
        //promise
        let page =(parseInt(req.query.page)-1)||0;
        let pageSize = 8
        Item.find({}).skip(pageSize*page).limit(pageSize)
            .then(items =>{
                Item.countDocuments({})
                .then((total)=>{
                    res.json({
                        items: mutipleMongooseToObject(items),
                        data: res.data,
                        pageLength: (Math.ceil((total)/pageSize)),
                        currentPage:(page+1)
                    })
                })

            })
            .catch(next);
    }
}

module.exports = new homeController();