
const Item = require('../modals/Item');
const {mutipleMongooseToObject} = require('../../util/mongoose');
// const jwt = require('jsonwebtoken');
// const user = require('../modals/user')
class MeController{

    // [get] /me/stored/courses /: slug
    //deletedAt = null là điều kiện khi xoá xẽ không xoá hẳn trong database
    storedItem(req,res, next){

        Promise.all([Item.find({}),Item.countDocumentsDeleted()])
            .then(([items, deleteCount]) =>
                res.render("items/me",{
                    deleteCount,
                    items: mutipleMongooseToObject(items),
                    data:res.data
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
        Item.findDeleted({})
            // render ra file trash-courses.hbs
            .then((items)=> res.render('items/trash-items',{
                items: mutipleMongooseToObject(items),
                data:res.data
            }))
            .catch(next)
    }
        
}

module.exports = new MeController();