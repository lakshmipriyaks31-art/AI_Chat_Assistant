const ApiResponse = require("../../utils/apiResponse")
const { Message_CREATED, Message_OK,Message_Delete } = require("../../utils/errorMessage")
const { CREATED, OK } = require("../../utils/HttpStatus")
const { addService,list,deletechat } = require("../services/chat.service")

exports.chatroom = async(req,res)=>{
    let data =  await addService({userid:req?.user?._id,topic:req?.body?.topic})
    ApiResponse.success(res,data,Message_CREATED,CREATED)
} 

exports.allchat = async(req,res) => {
    let data =  await list(req?.user?._id)
    ApiResponse.success(res,data,Message_OK,OK)
}


exports.particularchat = async(req,res) => {
    
       let data =  await list(req?.user?._id,req?.params?.chatid,req?.query?.page)
    ApiResponse.success(res,data,Message_OK,OK)
}


exports.deletechat = async(req,res) => {
    let data = await deletechat({userid:req?.user?._id,chatid:req?.params?.chatid})
      ApiResponse.success(res,Message_Delete,OK)
}