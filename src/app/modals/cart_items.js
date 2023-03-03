const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

// soft delete
const mongooseDelete = require('mongoose-delete');

const CartItems = new Schema({
  id_user: {type: String, required: true},
  id_item: {type: String, required: true},
  soluong: {type: Number, required: true},
  gia:{type: String, required: true},
  tong_gia:{type: String, required: true},
//   slug: { type: String, slug: 'loai', unique: true}
},{
  timestamps: true,
});

// add plugin methods
// { overrideMethods: 'all' } chọn cái k có delete true
mongoose.plugin(slug);
CartItems.plugin(mongooseDelete, {
    deletedAt : true,
    overrideMethods: 'all' 
});

module.exports = mongoose.model('CartItems',CartItems)