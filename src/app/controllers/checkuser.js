// const {MongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose');
// const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const user = require('../modals/user')
const cookieParser = require('cookie-parser')


class getUser{
    getuser(req,res,next){
        try {
            let token = req.cookies.token
            let idUser = jwt.verify(token,"mk")
            user.findOne({_id: idUser})
            .then(data => {
                let data1 ={
                    username: data.username,
                    role: data.role,
                    extname: data.extname,
                    fullname: data.fullname,
                    avatar: data.avatar,
                    tell: data.tell,
                    gender: data.gender,
                    birthday: data.birthday,
                    address: data.address
                }
                res.data =data1
                next();
            })
            .catch(error=>{
                res.json("sai")
            })  
        } catch (error) {
            // res.json("sai")
            let data2 ={
                username: false,
                role: 0,
            }
            res.data =data2
            next()
        }   
    }
    checkAdmin(req,res,next){
        try {
            let role = res.data.role;
            if(role===3){
                next();
            }
            else{
                res.redirect("back");
            }
        } catch (error) {
            res.redirect("back");
        }
        
    }

    checklogin(req, res, next) {
        try {
            let token = req.cookies.token
            let idUser = jwt.verify(token,"mk")
            user.findOne({_id: idUser})
            .then(data => {
                next();
            })
            .catch(error=>{
                res.json("sai")
            })  
        } catch (error) {
            // res.json("sai")
            res.redirect("/auth/login")
        }   
    }
}

module.exports = new getUser();