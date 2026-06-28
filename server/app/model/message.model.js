const { default: mongoose, Schema, model } = require("mongoose");

const messageSchema = new Schema({
    content:String,
    role:String,
    chatid:{
        type : Schema.Types.ObjectId,
        ref:'chats'
    },
    userid:{
        type : Schema.Types.ObjectId,
        ref:'users'
    }
},{ timestamps: true })

module.exports = model('messages',messageSchema)