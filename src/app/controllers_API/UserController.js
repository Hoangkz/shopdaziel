const { hashPassword, checkPassword } = require('../../util/mongoose');
const User = require('../modals/user');
const { MongooseToObject, mutipleMongooseToObject, mongooseToGetLish } = require('../../util/mongoose');
const nodemailer = require("nodemailer");

class UserController {

    async showLishUser(req, res, next) {
        const admin = await User.findById(req.body.id)
        let page =(parseInt(req.query.page)-1)||0;
        let pageSize = 6
        if(admin.role === 3){
            User.find({},{ password: 0 }).skip(pageSize*page).limit(pageSize)
            .then(async (user) => {
                    const search = req.body.search||""
                    const total = await User.countDocuments({})
                    if(search){
                        user = user.filter((data,index) => data.username.toLowerCase().includes(search.toLowerCase()))
                    }
                    return res.status(200).json({
                        user: mutipleMongooseToObject(user),
                        message:"Success",
                        pageLength: (Math.ceil((total)/pageSize)),
                        currentPage:(page+1)
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        message:"Lỗi server",
                    })
                })
        }
        else{
            res.status(403).json({
                message:"Bạn không đủ quyền hạn!",
            })
        }
    }
    changePassword(req, res, next) {
        console.log('changePassword')
        let newPassword = req.body.newPassword;
        let password = req.body.password;
        User.findById(req.body.id)
            .then(user => {
                if (checkPassword(password, user.password)) {
                    if (newPassword.length >= 5) {
                        user.password = hashPassword(newPassword)
                        user.save()
                        return res.status(200).json({
                            message: "Thay đổi mật khẩu thành công"
                        })
                    }
                    return res.status(400).json({
                        message: "Mật khẩu mới phải có ít nhất 5 ký tự"
                    })
                }
                else {
                    return res.status(400).json({
                        message: "Mật khẩu cũ không chính xác!"
                    })
                }
            })
            .catch((error) => {
                return res.status(500).json({
                    message: "Lỗi server!"
                })
            })
    }

    showUser(req, res, next) {
        Promise.all([User.findById(req.body.user).select('-password'),User.findById(req.body.admin)])
        .then(([user,admin])=>{
            if(admin&&admin.role===3){
                return res.status(200).json({
                    user: MongooseToObject(user),
                    message:"GET user thành công!"
                });
            }
            else{
                return res.status(403).json({message:"Forbiđen!"});
            }
        })
        .catch((error)=>res.status(500).json({message: "Lỗi server"}))
    }
    async deleteAccount(req, res, next) {
        const list_id = req.body?.listId?.split(",")
        const admin = await User.findById(req.body.id)
        if(admin?.role===3){
            User.delete({ _id: { $in: list_id } })
                .then((data) => res.status(200).json({ message:"Xoá account thành công!"}))
                .catch(error=>{res.status(500).json({ message:"Lỗi server"})})
        }
        else{
            res.status(403).json({ message:"Bạn không có quyền xoá!"})
        }
    }
    formUsers(req, res, next) {
        console.log(req.body)
        switch (req.body.action) {
            //chuyển vào thùng rác
            case "delete":
                User.delete({ _id: { $in: req.body["userIds[]"] } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            // Khôi phục
            case "fix":
                User.restore({ _id: { $in: req.body["userIds[]"] } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            // xoá vĩnh viễn
            case "permanentlyDelete":
                User.deleteMany({ _id: { $in: req.body["userIds[]"] } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default:
                res.json(req.body);
        }
    }

    updateUser(req, res, next) {
        const { id, ...rest } = JSON.parse(JSON.stringify(req.body))
        User.updateOne({ _id: id }, rest)
            .then(async () => {
                // const user = await User.findOne({_id: req.body.id})
                // const jsonUser = JSON.parse(JSON.stringify(user))
                // const refresh_token = jwt.sign({ id: jsonUser._id,username: jsonUser.username,gender:jsonUser.gender}, "refresh", { expiresIn: "1d"})
                // List_Token.find({ data: { $elemMatch: { _id:req.body.id}}})
                // .then((data)=>{
                //     console.log("vao 2")
                // })
                // .catch((data)=>{
                //     console.log(data)
                // })
                res.status(200).json({
                    // refresh_token:refresh_token,
                    message: "Update user successfully!"
                })
            })
            .catch((next) => {
                res.status(400).json({ message: "Update user error!" })
            })
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
                text: `Your new password is: ${newPassword}`,
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

}
module.exports = new UserController();