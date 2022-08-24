

module.exports = {
    mutipleMongooseToObject: function(mongooses) {
        return mongooses.map(mongoose=>mongoose.toObject())
    },
    MongooseToObject: function(mongoose) {
        return mongoose? mongoose.toObject():mongoose
    },
    mongooseToGetLish:function (mongooses) {
        return mongooses.map(mongoose=>{
            return {
                name:mongoose.toObject().name,
                img:mongoose.toObject().img
            }
        });
    },

}

// mongodb+srv://hoang:<GouIxy969gPx450t>@cluster0.glxu3.mongodb.net/Dalziel?retryWrites=true&w=majority
// GouIxy969gPx450t