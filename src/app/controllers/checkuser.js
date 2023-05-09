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
                    id: data._id,
                    username: data.username,
                    role: data.role,
                    extname: data.extname,
                    fullname: data.fullname,
                    avatar: data.avatar,
                    tell: data.tell,
                    gender: data.gender,
                    birthday: data.birthday,
                    address: data.address,
                    checkuser: data.checkuser
                }
                res.data =data1
                next();
            })
            .catch(error=>{
                res.status(500).json("Lỗi server")
            })  
        } catch (error) {
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
    checkProfile(req,res,next){
        try {
            let checkuser = res.data.checkuser;
            let fullname = res.data.fullname
            let address = res.data.address
            let tell= res.data.tell
            if(checkuser==1&&fullname&&address&&tell){
                next();
            }
            else{
                res.status(403).json({text:"Hãy nhập thông tin cá nhân",url:"/auth/user"})
            }
        } catch (error) {
            res.json({error:"error"})
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
                res.status(500).json("Lỗi server")
            })  
        } catch (error) {
            res.status(404).json({text:"Hãy đăng nhập để thực hiện chức năng này",url:"/auth/login"})
        }   
    }
}

module.exports = new getUser();