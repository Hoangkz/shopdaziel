// const {MongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose');
// const bodyParser = require('body-parser')
// const jwt = require('jsonwebtoken');
// const user = require('../modals/user')
// const cookieParser = require('cookie-parser')

// let checkLogin = function(req, res, next) {
//     try {
//         let token = req.cookies.token
//         let idUser = jwt.verify(token,"mk")
//         user.findOne({_id: idUser})
//         .then(data => {
//             if(data){
//                 console.log(data);
//                 req.data =data;
//                 next()
//             }
//             else{
//                 res.json("a")
//             }
//         })
//         .catch(error=>{
//             res.json("sai")
//         })
//     } catch (error) {
//         res.status(500).json("token không hợp lệ")
//     }
// }


// class AuthController{
//     login(req,res,next){
//         res.render("auth/login",{
//             layout:false,
//             loginFalied:false
//         })
//     }
//     logout(req,res,next){
//         res.clearCookie("token")
//         res.redirect("/")
//     }
//     signup(req,res,next){
//         res.render("auth/signup",{layout:false});
//     }

//     setLogin(req,res,next){
//         let username = req.body.username;
//         let password = req.body.password;
//         console.log("username: ",username,"password: ",password);
//         user.findOne({ username: username, password: password })
//             .then(data=>{
//                 console.log(data)
//                 if(data){
//                     let token = jwt.sign({_id:data._id},"mk")
//                     res.cookie("token",token,{ maxAge: 900000, httpOnly: true })
//                     // return res.redirect("/private")
//                     return res.redirect("/")
//                     // return res.json({
//                     //         message: "thành công",
//                     //         token: token 
//                     //     })
//                 }
//                 else{
//                     // return res.redirect("/auth/login")
//                     // return res.redirect("/")

//                     return res.render("auth/login",{
//                         layout: false,
//                         loginFalied:true,
//                     })
//                 }

//             })
//             .catch(err=>{
//                 res.status(500).json("lỗi sever")
//             })
//     }

//     getuser(req,res,next){
//         res.render("auth/user",{
//             data:res.data
//         })
//     }

// }

// module.exports = new AuthController();