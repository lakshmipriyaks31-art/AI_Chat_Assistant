const ApiResponse = require("../../utils/apiResponse")
const { Message_CREATED } = require("../../utils/errorMessage")
const { CREATED } = require("../../utils/HttpStatus")
const { addService } = require("../services/message.service")

exports.newmessage = async(req,res)=>{
    let data =  await addService(req?.body)
    ApiResponse.success(res,data,Message_CREATED,CREATED)
} 