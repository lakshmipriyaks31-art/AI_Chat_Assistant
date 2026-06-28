const { default: mongoose, Schema, model } = require("mongoose");

const userSchema = new Schema({
    username:String,
    password:String,
    refreshtoken:String,
    mobile:{
        type:String,
        unique:true
    }
},{timestamps:true})

module.exports=model('user',userSchema)