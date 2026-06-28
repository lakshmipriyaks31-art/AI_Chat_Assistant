const { MONGO_URI } = require("./config")
const mongoose = require("mongoose")

const db = async() =>{
    try{
    let conn = await mongoose.connect(MONGO_URI,{
        maxPoolSize: 20,           // Connection pool
        serverSelectionTimeoutMS: 50000,
        })
        console.log("Db Connected Successfully")
    }
    catch(e){
        console.log(`Mongo db connection failed due to ${e.toString()} ${MONGO_URI}`)
    }
}

module.exports = db