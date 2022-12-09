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
    //GET /items/store (edit)
    edit(req,res, next){
        User.findById(req.params.id)
            .then(user => res.render('items/edit',{
                user: MongooseToObject(user),
                data: res.data
            }))
            .catch(next)
        
    }
    
    //POST /items/create, tạo database    
    store(req,res, next){
        
        // res.json(req.body);
        // body nhận form từ sever gửi về database
        const user = new User(req.body);
        user.save()
            .then(()=>res.redirect('/me/stored/items'))
            .catch(next)
        // res.send(req.body.img)

    }
}
module.exports = new UserController();