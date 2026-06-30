const ApiResponse = require("../../utils/apiResponse")
const { Message_CREATED, Message_OK, Message_Logout } = require("../../utils/errorMessage")
const { CREATED, OK } = require("../../utils/HttpStatus")
const { Register, Login, getuser,logout } = require("../services/user.service")

exports.getUser = async(req,res) => {
    const {accesstoken,refreshtoken,currentuser} =await getuser(req?.user?._id)
    res.cookie("accessToken", accesstoken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 15 * 60 * 1000,
    })
    res.cookie("refreshToken", refreshtoken, {
        httpOnly: true,
        secure: true, // true in production
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    ApiResponse.success(res, currentuser,Message_OK, OK);

}

exports.Register = async(req,res) => {
    const {accesstoken,refreshtoken,currentuser} =await Register(req.body)
    res.cookie("accessToken", accesstoken, {
        httpOnly: true,
        //domain: "https://ai-chat-assistant-kslp.vercel.app/",
        secure: true,
        sameSite: "none",
    maxAge: 15 * 60 * 1000,
    })
    res.cookie("refreshToken", refreshtoken, {
        httpOnly: true,
        secure: true, // true in production
        //domain: "https://ai-chat-assistant-kslp.vercel.app/",
        sameSite: "none",
        maxAge: 7 * 24 * secure: true,60 * 60 * 1000
    });
    ApiResponse.success(res, currentuser,Message_CREATED, CREATED);

}
exports.Login = async(req,res) => {
    const {accesstoken,refreshtoken,currentuser} =await Login(req.body)
    res.cookie("accessToken", accesstoken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        //domain: "https://ai-chat-assistant-kslp.vercel.app/",
        maxAge: 15 * 60 * 1000,
    })
    res.cookie("refreshToken", refreshtoken, {
        httpOnly: true,
        secure: true, // true in production
        sameSite: "none",
        //domain: "https://ai-chat-assistant-kslp.vercel.app/",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    ApiResponse.success(res, currentuser,Message_OK, OK);

}

exports.logout = async(req,res) => {
    await logout(req?.user?._id)
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        //domain: "https://ai-chat-assistant-kslp.vercel.app/",
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true, // true in production
        sameSite: "none",
        //domain: "https://ai-chat-assistant-kslp.vercel.app/",
    });
    ApiResponse.success(res,Message_Logout, OK);

}