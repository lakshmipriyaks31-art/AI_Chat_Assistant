const AppError = require("../../utils/appError")
const { Message_CONFLICT } = require("../../utils/errorMessage")
const { CONFLICT } = require("../../utils/HttpStatus")
const chatModel = require("../model/chat.model")
const messageModel = require("../model/message.model")
const { findbychatid } = require("./message.service")

exports.findbyid = async(_id)=>{
    return await chatModel.findOne({userid:_id})
}
exports.addService = async(data)=>{
    // let isExist = await this.findbyid(data)
    // if(isExist) throw new AppError(Message_CONFLICT,CONFLICT,{error:Message_CONFLICT})
    let chat =await new chatModel(data)
    return chat.save()
}

exports.list = async(userid,chatid,page) => {
    return chatid
    ?await findbychatid({chatid,page})
    :await this.findbyuserid(userid)
}

exports.findbyuserid = async(userid) => {
    let result = await chatModel.find({userid,
                                // latestmessage: { $exists: true, $ne: null }
                                })
                                .select('-createdAt')
                                .sort('-updatedAt')
                                .skip(0)
                                .limit(10)
                                .populate({
                                    path :'latestmessage',
                                    model:'messages',
                                    select:'content updatedAt'
                                })                                       
    return result                            
}

exports.updateLatestMessage = async({_id,latestmessage}) => {
    return  await chatModel.findOneAndUpdate(
                {_id},
                {$set:{latestmessage}},
                {new:true}
            )
                        
}