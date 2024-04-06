
const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    name:String,
    emailOrPhone:String,
    password:String,
    
})
module.exports =mongoose.model('UserData',dataSchema)