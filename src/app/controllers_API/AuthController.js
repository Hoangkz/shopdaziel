const { hashPassword, checkPassword, mutipleMongooseToObject } = require('../../util/mongoose.js');
const jwt = require('jsonwebtoken');
const user = require('../modals/user');
const List_Token = require('../modals/token');

class AuthController {
    saveProfile(req, res, next) {
        let data = req.body
        data.checkuser = 1
        return res.status(400).json({ message: "error" })
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
                        .then(() => res.status(200).json({ message: 'Đăng ký tài khoản thành công' }))
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
                    return res.status(400).json({ message: "Thông tin tài khoản hoặc mật khẩu không chính xác" })
                }
                else{
                    data = JSON.parse(data)
                    const { password, ...rest } = data
                    const token = jwt.sign({ data: rest }, "mk", { expiresIn: '3s' })
                    const refresh_token = jwt.sign({ id: rest.id,username: rest.username,gender:rest.gender}, "refresh", { expiresIn: "1d"})
                    const newToken = new List_Token({data:rest,refresh_token});
                    newToken.save()
                    return res.status(200).json({
                        message: "Đăng nhập thành công",
                        token: token,
                        refresh_token: refresh_token
                    })
                }

            })
            .catch(err => {
                return res.status(500).json({message:"lỗi sever"})
            })
    }
    //Middleware
    accessToken(req, res, next) {
        const authorization = req.header.authorization
        const token = authorization.splid(" ")[1]
        if(!token)res.status(403).json({message: "Bạn không có quyền truy cập !"})
        jwt.verify(data,"mk",(err, data)=>{
            console.log(err,data)
            if(err)res.status(403).json({message: "Bạn không có quyền truy cập !"})
            next()
        })
    }


    refreshToken(req, res, next) {
        console.log("refreshToken")
        const refreshToken = req.body.refresh_token;
        if(!refreshToken){
            return res.status(401).json({
                message: "Thời gian truy cập của bạn đã hết!",
            }) 
        }
        else{
            List_Token.findOne({refresh_token:refreshToken})
            .then((data)=>{
                if(!data){
                    return res.status(401).json({
                        message: "Thời gian truy cập của bạn đã hết!",
                    }) 
                }
                else{
                    jwt.verify(refreshToken,"refresh",async(err, decoded)=>{
                        if (err) {
                            return res.status(401).json({
                                message: "Thời gian truy cập của bạn đã hết!",
                            })                  
                        }                                                                                                   
                        else{
                            const newUser = await user.findById(data.data._id)
                            const { password, ...rest } = JSON.parse(JSON.stringify(newUser))
                            const token =  jwt.sign({data:rest},"mk", { expiresIn: "2s" })
                            return res.status(200).json({
                                message: "Refresh token thành công",
                                token: token,
                            })
                        }
                    })
                }
            })
            .catch((error)=>{
                res.status(500).json({message:"lỗi sever"})
            })
        }
        
    }
    logout(req, res,next) {
        const refreshToken =req.body.refresh_token|| req.headers?.authorization?.split(' ')[1]|null
        List_Token.deleteOne({refresh_token: refreshToken})
        .then(()=> res.status(200).json({message:"Tài khoản của bạn đã được đăng xuất!"}))
        .catch(()=>res.status(500).json({message:"lỗi sever"}))
    }

}

module.exports = new AuthController();