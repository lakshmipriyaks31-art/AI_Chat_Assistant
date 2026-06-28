const AppError = require("../../utils/appError")
const { generatepassword, comparePassword } = require("../../utils/bcrypt")
const {  Message_MOBILE_CONFLICT, Message_MOBILE_NOT_EXIST, Message_USER_Not_Found } = require("../../utils/errorMessage")
const { CONFLICT, NOT_FOUND } = require("../../utils/HttpStatus")
const { generateRefreshToken, generateAccessToken } = require("../../utils/jwttkoken")
const userModel = require("../model/user.model")

exports.getUserById = async(_id) => {
        return await userModel.findOne({_id}).select('username id _id mobile')
}

exports.getUserByMobile = async(mobile) => {
    return await userModel.findOne({mobile}).select('username id mobile password')
}
exports.updateById = async({_id,refreshtoken}) => {
    return await userModel.findOneAndUpdate({_id},{$set:{refreshtoken}},{upsert:true})
    .select('username id mobile updatedAt')
}


exports.addService = async(data) => {
    data.password =await generatepassword(data.password)
    let user = await new userModel(data)
    return user.save()
}

exports.Register = async(data) => {
    let isExist = await this.getUserByMobile(data.mobile)
    if(isExist) throw new AppError(Message_MOBILE_CONFLICT,CONFLICT,{mobile:Message_MOBILE_CONFLICT})
    let new_user = await this.addService(data)
    let {accesstoken,refreshtoken} =await this.token({_id:new_user._id,mobile:new_user.mobile})
    let currentuser = await this.updateById({_id:new_user._id,refreshtoken})
    return {accesstoken,refreshtoken,currentuser} 
}

exports.getuser = async(data) => {
    let isExist = await this.getUserById(data)
    if(!isExist) throw new AppError(Message_USER_Not_Found,NOT_FOUND,{mobile:Message_USER_Not_Found})
    let {accesstoken,refreshtoken} =await this.token({_id:isExist._id,mobile:isExist.mobile})
    let currentuser = await this.updateById({_id:isExist._id,refreshtoken})
    return {accesstoken,refreshtoken,currentuser} 
}


exports.token = async(data) => {
    let accesstoken = await generateAccessToken(data)
    let refreshtoken = await generateRefreshToken(data)
    return {accesstoken,refreshtoken}
}

exports.Login = async(data) => {
    let isExist = await this.getUserByMobile(data.mobile)
    if(!isExist) throw new AppError(Message_MOBILE_NOT_EXIST,NOT_FOUND,{mobile:Message_MOBILE_NOT_EXIST})
    await comparePassword(data.password,isExist.password)
    let {accesstoken,refreshtoken} =await this.token({_id:isExist._id,mobile:isExist.mobile})
    let currentuser=await this.updateById({_id:isExist._id,refreshtoken})
    return {accesstoken,refreshtoken,currentuser} 
}

exports.logout = async(data) => {
    let isExist = await this.getUserById(data)
    if(!isExist) throw new AppError(Message_USER_Not_Found,NOT_FOUND,{mobile:Message_USER_Not_Found})
    let currentuser=await this.updateById({_id:isExist._id,refreshtoken:""})
    return currentuser
}