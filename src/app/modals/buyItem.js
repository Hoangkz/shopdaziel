const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

// soft delete
const mongooseDelete = require('mongoose-delete');

const buyItem = new Schema({
  id_user: {type: String, required: true},
  id_item: {type: String, required: true},
  soluong: {type: Number, required: true},
  buy:{type: String, default: false}
//   slug: { type: String, slug: 'loai', unique: true}
},{
  timestamps: true,
});

// add plugin methods
// { overrideMethods: 'all' } chọn cái k có delete true
mongoose.plugin(slug);
buyItem.plugin(mongooseDelete, {
    deletedAt : true,
    overrideMethods: 'all' 
});

module.exports = mongoose.model('buyItem',buyItem)