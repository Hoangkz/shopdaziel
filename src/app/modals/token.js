const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');


const Token = new Schema({
  refresh_token: {type: String, required: true},
  data: {type: Object, required: true},
},{
  timestamps: true,
});
module.exports = mongoose.model('Token',Token)