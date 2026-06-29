const { post,get,deleteModule } = require(".");

exports.createchatroom = async(data)=>{
      return await post([`${process.env.REACT_APP_chat}`,data]);
}
exports.getmessages = async(data)=>{
      return await get([`${process.env.REACT_APP_chat}${data.chatId}`,{params:data}]
    );
}

exports.getchatservice = async(data)=>{
      return await get([`${process.env.REACT_APP_chat}`]
    );
}

exports.newmessageservice = async(data) => await post([`${process.env.REACT_APP_message}`,data])
exports.deletchatservice = async(data) => await deleteModule([`${process.env.REACT_APP_chat}`,data])
