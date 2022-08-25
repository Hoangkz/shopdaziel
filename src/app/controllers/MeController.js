
const Course = require('../modals/Item');
const {mutipleMongooseToObject} = require('../../util/mongoose');
// const jwt = require('jsonwebtoken');
// const user = require('../modals/user')
class MeController{

    // [get] /me/stored/courses /: slug
    //deletedAt = null là điều kiện khi xoá xẽ không xoá hẳn trong database
    storedCourses(req,res, next){

        Promise.all([Course.find({}),Course.countDocumentsDeleted()])
            .then(([courses, deleteCount]) =>
                res.render("me",{
                    deleteCount,
                    courses: mutipleMongooseToObject(courses)
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

    trashCourse(req,res,next){
        Course.findDeleted({})
            // render ra file trash-courses.hbs
            .then((courses)=> res.render('trash-courses',{
                courses: mutipleMongooseToObject(courses)
            }))
            .catch(next)
    }
        
}

module.exports = new MeController();