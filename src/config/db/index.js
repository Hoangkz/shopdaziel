const mongoose = require('mongoose');
let link ="mongodb+srv://hoang:auJ4wXxOkTn3lR9C@cluster0.glxu3.mongodb.net/Dalziel?retryWrites=true&w=majority"
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