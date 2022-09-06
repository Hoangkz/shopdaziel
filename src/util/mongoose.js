
const bcrypt = require('bcrypt');

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
    hashPassword:function(password) {
        let saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(password, salt);
        return hash;    
    },
    checkPassword:function(password,hash) {

        let isPassword = bcrypt.compareSync(password, hash);

        return isPassword;    
    }

}

// mongodb+srv://hoang:<GouIxy969gPx450t>@cluster0.glxu3.mongodb.net/Dalziel?retryWrites=true&w=majority
// GouIxy969gPx450t