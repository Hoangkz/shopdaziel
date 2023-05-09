
const Item = require('../modals/Item');
const {mutipleMongooseToObject} = require('../../util/mongoose');
// const jwt = require('jsonwebtoken');
// const user = require('../modals/user')
class MeController{

    // [get] /me/stored/courses /: slug
    //deletedAt = null là điều kiện khi xoá xẽ không xoá hẳn trong database
    storedItem(req,res, next){
        let page =(parseInt(req.query.page)-1)||0;
        let pageSize = 5
        let search = req.query.search;
        let regex = search ? new RegExp(search, 'i') : '';

        let query = search ? { name: { $regex: regex } } : {};
        Promise.all([Item.find(query).sort({updatedAt: 'desc'}).skip(pageSize*page).limit(pageSize),Item.countDocumentsDeleted(),Item.countDocuments(query)])
            .then(([items, deleteCount,total]) =>
                res.render("items/me",{
                    deleteCount,
                    items: mutipleMongooseToObject(items),
                    data:res.data,
                    pageLength: (Math.ceil((total)/pageSize)),
                    currentPage:(page+1),
                    search
                })
            )
            .catch(next);



        // Course.countDocumentsDeleted()
        //     .then((deleteCourse)=>{

        //     })
        //     .catch(next);

        // Course.find({})
        //     // render ra file me.hbs
        //     .then(courses => res.render('me',{
        //         courses: mutipleMongooseToObject(courses)
        //     }))
        //     .catch(next)
    }

    trashItem(req,res,next){
        Item.findDeleted({}).sort({updatedAt: 'desc'})
            // render ra file trash-courses.hbs
            .then((items)=> res.render('items/trash-items',{
                items: mutipleMongooseToObject(items),
                data:res.data
            }))
            .catch(next)
    }
        
}

module.exports = new MeController();