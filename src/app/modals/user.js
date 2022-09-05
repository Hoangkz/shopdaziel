const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

// soft delete
const mongooseDelete = require('mongoose-delete');

const User = new Schema({
  username: {type: String, required: true},
  password: {type: String,required: true},
  extname: {type: String},
  fullname: {type: String},
  avatar : {type: String},
  tell :{type: Number},  
  gender :{type: String,default: 'khác'},
  role: {type: Number, default:1},
},{
  timestamps: true,
});

// add plugin methods
// { overrideMethods: 'all' } chọn cái k có delete true
mongoose.plugin(slug);
User.plugin(mongooseDelete, {
      deletedAt : true,
      overrideMethods: 'all' 
    });

module.exports = mongoose.model('User',User)