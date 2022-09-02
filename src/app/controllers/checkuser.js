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
                if(data){
                    console.log(data);
                    let dataNew ={
                        username: data.username,
                        role: data.role,
                        extname: data.extname,
                        fullname: data.fullname,
                        avatar: data.avatar,
                        tell: data.tell,
                    }
                    res.data =dataNew
                    console.log(res.data);    
                }
                else{
                    return data;
                }
                next();
            })
            .catch(error=>{
                res.json("sai")
            })  
        } catch (error) {
            // res.json("sai")
            next()
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