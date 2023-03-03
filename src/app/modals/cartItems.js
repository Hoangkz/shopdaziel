const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

// soft delete
const mongooseDelete = require('mongoose-delete');

// status 
//        1: Trong giỏ hàng
//        2: Chờ giao hàng
//        3: Đơn hàng đã huỷ
//        4: Giao hàng thành công
//        5: Người bán huỷ

const CartItems = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  item_id: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  soluong: {type: String, required: true},
  gia:{type: String, required: true},
  tong_gia:{type: String, required: true},
  buy:{type: Boolean,default:false},
  status: {type: String,default:"1", required: false}

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