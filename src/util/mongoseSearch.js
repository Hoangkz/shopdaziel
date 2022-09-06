module.exports = {
    mongooseToSearch:function (mongooses, Search) {
        return mongooses.filter((mongoose) => {
                if(mongoose.toObject().name.toLowerCase().includes(Search.toLowerCase())){
                    return mongoose.toObject()
                }
            })
    }
}