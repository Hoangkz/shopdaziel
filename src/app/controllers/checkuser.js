// // const {MongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose');
// // const bodyParser = require('body-parser')
// const jwt = require('jsonwebtoken');
// const user = require('../modals/user')
// // const cookieParser = require('cookie-parser')


// class getUser{
//     getuser(req,res,next){
//         try {
//             let token = req.cookies.token
//             let idUser = jwt.verify(token,"mk")
//             user.findOne({_id: idUser})
//             .then(data => {
//                 if(data){
//                     console.log(data);
//                     data={
//                             username: data.username,
//                             role: data.role,
//                             avatar: data.avatar,
//                             tell: data.tell,
//                             extname: data.email,
//                         }
//                         res.data =data        
//                 }
//                 else{
//                     return data;
//                 }
//                 next();
//             })
//             .catch(error=>{
//                 res.json("sai")
//             })  
//         } catch (error) {
//             // res.json("sai")
//             next()
//         }   
//     }
// }

// module.exports = new getUser();