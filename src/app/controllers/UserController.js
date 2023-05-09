const {hashPassword,checkPassword} = require('../../util/mongoose');
const User = require('../modals/user');
const {MongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose');
const nodemailer = require("nodemailer");

class UserController{

    showLishUser(req,res, next){
        let page =(parseInt(req.query.page)-1)||0;
        let pageSize = 5
        let search = req.query.search?.trim();
        let query;
        let regex = search ? new RegExp(search, 'i') : '';
        if(search == "khách hàng"||search == "Khách hàng"){
            query = search ? {role:1} : {};
        }
        else if(search == "Nhân viên"||search == "nhân viên"){
            query = search ? {role:2} : {};
        }
        else if(search == "admin"||search == "Admin"){
            query = search ? {role:3} : {};
        }
        else{
            query = search ? {$or: [{username: { $regex: regex }},{fullname: { $regex: regex }},{extname: { $regex: regex }},{tell: { $regex: regex }}] } : {};
        }
        Promise.all([User.find(query).sort({updatedAt: 'desc'}).skip(pageSize*page).limit(pageSize),User.countDocuments(query)])
            // res.json(req.params.id)
            .then(([user,total]) => {
                return res.render('users/listUser',{
                    user: mutipleMongooseToObject(user),
                    data: res.data,
                    pageLength: (Math.ceil((total)/pageSize)),
                    currentPage:(page+1),
                    search
                });
            })
            .catch(next) 
    }
    changePassword(req,res, next){
        let newPassword = req.body.newPassword;
        let password = req.body.password;
        User.findById(req.params.id)
            .then(user => {
                if(checkPassword(password,user.password)){
                    if(newPassword.length>=5){
                        user.password = hashPassword(newPassword)
                        user.save()
                        return res.redirect('/auth/user')
                    }
                    else{
                        return res.error();
                    }
                }
                else{
                    return res.error();
                }
                
            })
            .catch(next) 
    }
    showUser(req,res, next){
        User.findById(req.params.id)
            // res.json(req.params.id)
            .then(user => {
                return res.render('users/user',{
                    user: MongooseToObject(user),
                    data: res.data
                });
            })
            .catch(next) 
    }
    deleteAccount(req,res, next){
        User.delete({_id: req.params.id})
        .then(()=> res.redirect('back'))
        .catch(next)
    }
    formUsers(req,res, next){
        console.log(req.body)
        switch(req.body.action){
            //chuyển vào thùng rác
            case "delete":
                User.delete({_id: {$in: req.body["userIds[]"]}})
                    .then(()=> res.redirect('back'))
                    .catch(next)
                break;
            // Khôi phục
            case "fix":
                User.restore({_id: {$in: req.body["userIds[]"]}})
                    .then(()=> res.redirect('back'))
                    .catch(next)
                break;
            // xoá vĩnh viễn
            case "permanentlyDelete":
                User.deleteMany({_id: {$in: req.body["userIds[]"]}})
                    .then(()=> res.redirect('back'))
                    .catch(next)
                break;  
            default:
                res.json(req.body);
        }
    }
    async forgotPassword(req, res, next) {
        const email = req.body.email
        const username = req.body.account
        const user = await User.findOne({ username: username, extname: email })
        if (user) {
            const newPassword = Math.random().toString(36).slice(-8);
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                service: "gmail",
                auth: {
                    user: "20111061045@hunre.edu.vn",
                    pass: "A12345678q",
                },
            });
            const mailOptions = {
                from: "20111061045@hunre.edu.vn",
                to: email,
                subject: "Your new password",
                html: `
                <h3>Forgot Password</h3>
                <p>Chào ${user.username},</p>
                <p>Mật khẩu mới của bạn là: ${newPassword}</p>
                <p>Vui lòng thay đổi mật khẩu của bạn sau khi đăng nhập vì mục đích bảo mật.</p>
                <br>
                <a href="http://localhost:8000/auth/login">Trở lại đăng nhập</a>
              `,            
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(500).json({ message: "Server đang quá tải, hãy thử lại sau!" });
                } else {
                    user.password = hashPassword(newPassword)
                    user.save();
                    res.status(200).json({ message: "Mật khẩu mới đã được gửi đến email của bạn!" })
                }
            });
        }
        else {
            res.status(400).json({ message: "Email không hợp lệ!" })
        }
    }

    getForgotPassword(req,res, next){
        return res.render('users/forgotpassword',{
            layout:false
        });
    }
}
module.exports = new UserController();