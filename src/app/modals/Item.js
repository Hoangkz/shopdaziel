const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

// soft delete
const mongooseDelete = require('mongoose-delete');

const Item = new Schema({
  name: {type: String, required: true},
  description: {type: String},
  loai: {type: String},
  img: {type: String},
  gia: {type: Number,required: true},
  soluong: {type: Number},
  slug: { type: String, slug: 'name', unique: true}

},{
  timestamps: true,
});

// add plugin methods
// { overrideMethods: 'all' } chọn cái k có delete true
mongoose.plugin(slug);
Item.plugin(mongooseDelete, {
      deletedAt : true,
      overrideMethods: 'all' 
    });

module.exports = mongoose.model('Item',Item)