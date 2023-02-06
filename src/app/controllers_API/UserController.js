const {hashPassword,checkPassword} = require('../../util/mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../modals/user');
const {MongooseToObject, mutipleMongooseToObject,mongooseToGetLish} = require('../../util/mongoose');

class UserController{

    showLishUser(req,res, next){
        User.find({})
            // res.json(req.params.id)
            .then(user => {
                return res.render('users/listUser',{
                    user: mutipleMongooseToObject(user),
                    data: res.data
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
}
module.exports = new UserController();