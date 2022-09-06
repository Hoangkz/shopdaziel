// const {MongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose');
// const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const user = require('../modals/user')
const cookieParser = require('cookie-parser')

class AuthController{
    login(req,res,next){
        res.render("auth/login",{
            layout:false,
            loginFalied:false
        })
    }
    logout(req,res,next){
        res.clearCookie("token")
        res.redirect("/")
    }
    signup(req,res,next){
        res.render("auth/signup",{layout:false});
    }

    saveAccount(req,res,next){
        const user = new User(req.body);
        user.save()
            .then(()=>res.redirect('/auth/login'))
            .catch(next)
    }

    setLogin(req,res,next){
        let username = req.body.username;
        let password = req.body.password;
        // console.log("username: ",username,"password: ",password);
        user.findOne({ username: username, password: password })
            .then(data=>{
                // console.log(data)
                if(data){
                    let token = jwt.sign({_id:data._id},"mk")
                    res.cookie("token",token,{ maxAge: 9000000, httpOnly: true })
                    // return res.redirect("/private")
                    return res.redirect("/")
                    // return res.json({
                    //         message: "thành công",
                    //         token: token 
                    //     })
                }
                else{
                    // return res.redirect("/auth/login")
                    // return res.redirect("/")

                    return res.render("auth/login",{
                        layout: false,
                        loginFalied:true,
                    })
                }

            })
            .catch(err=>{
                res.status(500).json("lỗi sever")
            })
    }

    getuser(req,res,next){
        res.render("auth/user",{
            data:res.data
        })
    }

}

module.exports = new AuthController();