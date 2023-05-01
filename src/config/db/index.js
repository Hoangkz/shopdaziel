const mongoose = require('mongoose');
const link =process.env.MONGODB_URI
async function connect(){
    try {
        await mongoose.connect(link,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connect true');
    } catch (error) {
        console.log('Connect flase');
    }
}
module.exports = {connect};