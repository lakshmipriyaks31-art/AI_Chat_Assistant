const { default: apiClient } = require("../api/api.config")

exports.post = async(data)=>{
    try{
     let result = await apiClient.post(...data)
     return result.data
    }
    catch(e){
        return e.response?.data
    }
}

exports.get = async(data)=>{
    try{
     let result = await apiClient.get(...data)
     return result.data
    }
    catch(e){
        return e.response?.data
    }
}
exports.deleteModule = async(data)=>{
    try{
     let result = await apiClient.delete(...data)
     return result.data
    }
    catch(e){
        return e.response?.data
    }
}

