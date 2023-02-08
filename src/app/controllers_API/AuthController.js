const {hashPassword,checkPassword} = require('../../util/mongoose');
const jwt = require('jsonwebtoken');
const user = require('../modals/user');

class AuthController{
    saveProfile(req,res,next){
        let data = req.body
        data.checkuser = 1
        return res.json({message:"error"})
        user.updateOne({_id: req.params.id}, data)
        // redirect chuyển sang trang ....
        .then(()=> {
            res.redirect('/auth/user/')
        })
        .catch(next)
    }
    saveAccount(req,res,next){
        let username = req.body.username;
        let password = req.body.password
        const newUser = new user({username:username,password: hashPassword(password)});
        user.findOne({username:username})
        .then(data =>{
            if(data==null){
                newUser.save()
                .then(()=>res.json({message:'Đăng ký tài khoản thành cônng'}))
                .catch(next)
            }
            else{

                res.json({message:'Tên tài khoản đã được đăng ký, hãy chọn một tên tài khoản khác'})
            }
        })
        .catch(err =>{
            res.json("lỗi sever")
        })
    }

    setLogin(req,res,next){
        let username = req.body.username;
        let password = req.body.password;
        user.findOne({ username: username})
            .then(data=>{

                if(data){
                    if(checkPassword(password,data.password)){
                        
                        let token = jwt.sign({_id:data._id},"mk")
                        res.cookie("token",token,{ maxAge: 9000000, httpOnly: true })
                        return res.json({
                                message: "thành công",
                                token: token 
                            })
                    }
                    else{
                        res.json({ message: "Thông tin tài khoản hoặc mật khẩu không chính xác"})
                    }
                }
                else{
                    res.json({ message: "Thông tin tài khoản hoặc mật khẩu không chính xác"})
                }

            })
            .catch(err=>{
                res.status(500).json("lỗi sever")
            })
    }

}

module.exports = new AuthController();