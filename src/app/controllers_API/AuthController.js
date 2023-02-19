const { hashPassword, checkPassword, mutipleMongooseToObject } = require('../../util/mongoose.js');
const jwt = require('jsonwebtoken');
const user = require('../modals/user');
const List_Token = require('../modals/token');

class AuthController {
    saveProfile(req, res, next) {
        let data = req.body
        data.checkuser = 1
        return res.json({ message: "error" })
        user.updateOne({ _id: req.params.id }, data)
            // redirect chuyển sang trang ....
            .then(() => {
                res.redirect('/auth/user/')
            })
            .catch(next)
    }

    // refreshToken(req, res, next){
    //     const refreshToken = req.body.token;
    //     if(!refreshToken){
    //         res.sendStatus(401);
    //     }
    // }
    //đăng ký
    saveAccount(req, res, next) {
        let username = req.body.username;
        let password = req.body.password
        const newUser = new user({ username: username, password: hashPassword(password) });
        user.findOne({ username: username })
            .then(data => {
                if (data == null) {
                    newUser.save()
                        .then(() => res.json({ message: 'Đăng ký tài khoản thành công' }))
                        .catch(next)
                }
                else {
                    res.status(400).json({ message: 'Tên tài khoản đã được đăng ký, hãy chọn một tên tài khoản khác' })
                }
            })
            .catch(err => {
                res.json("lỗi sever")
            })
    }
    //đăng nhập

    setLogin(req, res, next) {
        let username = req.body.username;
        let password = req.body.password;
        user.findOne({ username: username })
            .then(response => {
                if (response) {
                    if (checkPassword(password, response.password)) {
                        return JSON.stringify(response)
                    }
                    else {
                        return false
                    }
                }
                else {
                    return false
                }
            })
            .then(data => {
                if(!data){
                    res.status(400).json({ message: "Thông tin tài khoản hoặc mật khẩu không chính xác" })
                }
                else{
                    data = JSON.parse(data)
                    const { password, ...rest } = data
                    const token = jwt.sign({ data: rest }, "mk", {
                        expiresIn: "60s"
                    })
                    const refresh_token = jwt.sign({ data: rest }, "refresh", {
                        expiresIn: "360d"
                    })
                    const newToken = new List_Token({refresh_token});
                    newToken.save()
                    .then(() => {
                        return res.json({
                            message: "Đăng nhập thành công",
                            token: token,
                            refresh_token: refresh_token
                        })
                    })
                    .catch(err => {
                        res.status(500).json({message:"lỗi sever"})
                    })
                }

            })
            .catch(err => {
                res.status(500).json({message:"lỗi sever"})
            })
    }
    //Middleware
    accessToken(req, res, next) {
        const authorization = req.header["authorization"]|
        console.log(authorization)
        const token = authorization.splid(" ")[1]
        if(!token)res.status(403).json({message: "Bạn không có quyền truy cập !"})
        jwt.verify(data,"mk",(err, data)=>{
            console.log(err,data)
            if(err)res.status(403).json({message: "Bạn không có quyền truy cập !"})
            next()
        })
    }


    refreshToken(req, res, next) {
        const refreshToken = req.body.refresh_token;
        if(!refreshToken){
            return res.status(401).json("token không hợp lệ")
        }
        List_Token.findOne({refresh_token:refreshToken})
        .then((data)=>{
            if(!data){
                return res.status(401).json("token không hợp lệ")
            }
            jwt.verify(refreshToken,"refresh",(err, decoded)=>{
                if (err) {
                    res.status(401).json("Lỗi token không hợp lệ")                  
                }
                const token =  jwt.sign({decoded},"mk", {expiresIn: "60s"})
                res.json({
                    message: "Refresh token thành công",
                    token: token,
                })
            })
        })
        .catch((error)=>{
            res.status(500).json({message:"lỗi sever"})
        })
        
    }
    logout(req, res,next) {
        const refreshToken = req.body.token
        List_Token.deleteOne({refresh_token: refreshToken})
        .then(()=> res.status(200).json({messsage:"Bạn đã đăng xuất!"}))
        .catch(()=>res.json("lỗi sever"))
    }

}

module.exports = new AuthController();