// const {MongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose');
// const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const user = require('../modals/user')


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
            const authHeader = req.headers.authorization;
            if (authHeader) {
                const token = authHeader.split(' ')[1];
                // Thực hiện xử lý với token
                const decoded = jwt.decode(token);
                if (decoded.data.role ===3){
                    next()
                }
                else{
                    res.status(403).json({message:'Bạn Không có quyền'});
                }
            } else {
                res.status(401).json({message:'Authorization header is missing'});
            }
        } catch (error) {
            res.status(500).json({message:'Lỗi server'});
        }
        
    }

    checkUser(req,res,next){
        try {
            const authHeader = req.headers.authorization;
            if (authHeader) {
                const token = authHeader.split(' ')[1];
                // Thực hiện xử lý với token
                const decoded = jwt.decode(token);
                if (decoded){
                    next()
                }
                else{
                    res.status(403).json({message:'Hãy thực hiện đăng nhập'});
                }
            } else {
                res.status(401).json({message:'Authorization header is missing'});
            }
        } catch (error) {
            res.status(500).json({message:'Lỗi server'});
        }
        
    }

    checkProfile(req,res,next){
        try {
            let checkuser = res.data.checkuser;
            if(checkuser==1){
                next();
            }
            else{
                res.json({error:"error"})
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
                res.json("sai")
            })  
        } catch (error) {
            // res.json("sai")
            res.redirect("/auth/login")
        }   
    }
}

module.exports = new getUser();