const bcrypt = require("bcryptjs")
const AppError = require("./appError")
const { NOT_FOUND } = require("./HttpStatus")
const { Message_Wrong_Password } = require("./errorMessage")

exports.generatepassword = async(password)=>{
         const salt = await bcrypt.genSalt()
          return await bcrypt.hash(password,salt)
}

exports.comparePassword =  async(password,hashedPassword)=>{
         let value= await bcrypt.compare(password,hashedPassword)
         
         if(!value) throw new AppError(Message_Wrong_Password,NOT_FOUND,{password:Message_Wrong_Password})
         
}

