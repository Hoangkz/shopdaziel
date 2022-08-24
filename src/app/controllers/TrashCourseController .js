
// const Course = require('../modals/Item');
// const jwt = require('jsonwebtoken');
// const user = require('../modals/user')
// const {mutipleMongooseToObject} = require('../../util/mongoose');
// class TrashCourseController {
//         // thùng rác
//         trashCourse(req,res,next){
//             Course.find({})
//                 .then(()=> res.render('trash-courses',{
//                     courses: mutipleMongooseToObject(courses)
//                 }))
//                 .catch(next)
//         }
//         storedCourses(req,res, next){
//             Course.find({})
//                 .then(courses => res.render('me',{
//                     courses: mutipleMongooseToObject(courses)
//                 }))
//                 .catch(next)
//         }
// }

// module.exports = new TrashCourseController ();