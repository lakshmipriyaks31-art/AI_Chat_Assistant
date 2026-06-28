const { Schema, Types, model } = require("mongoose");

const chatSchema = new Schema({
   topic:String,
   userid:{
        type : Schema.Types.ObjectId,
        ref:'users'
    },
    latestmessage:{
        type : Schema.Types.ObjectId,
        ref:'messages'
    }
},{ timestamps: true , strictPopulate: false})

module.exports = model('chats',chatSchema)