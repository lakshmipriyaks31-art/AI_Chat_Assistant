const { post,get } = require(".");

exports.loginService = async(data)=>{
      return await post([`${process.env.REACT_APP_user}login`,data]);
}
exports.registerService = async(data)=>{
      return await post([`${process.env.REACT_APP_user}register`,data]
    );
}

exports.currentUserService = async(data)=>{
      return await get([`${process.env.REACT_APP_user}`]
    );
}

exports.logoutService = async() => await get([`${process.env.REACT_APP_user}logout`])