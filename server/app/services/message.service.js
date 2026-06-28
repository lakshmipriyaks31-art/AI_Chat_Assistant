// const { genAimodel } = require("../../config/ai")
const { genAimodel, openAi, geminiAI } = require("../../config/ai")
const AppError = require("../../utils/appError")
const { Message_CONFLICT } = require("../../utils/errorMessage")
const { CONFLICT } = require("../../utils/HttpStatus")
const chatModel = require("../model/chat.model")
const messageModel = require("../model/message.model")
const chatService = require("./chat.service")


exports.findchatid = async(chatid)=>{
    return await messageModel.find({chatid}).sort('-updatedAt').select('content role').limit(10)
}

exports.addService = async(data)=>{
    let isExist = await this.findchatid(data.chatid)
  // Build messages array for OpenAI
    let aireply = await generateGemnini(isExist,data)
    let usermsg = await save({...data,...{role:"user"}})
    let latestMessage = await save({role:'assistant',content:aireply,chatid:data.chatid})
    await chatService.updateLatestMessage({_id:data.chatid,latestmessage:latestMessage._id})
    return {usermsg,latestMessage}
}

const save=async(data)=>{
    let mes = await new messageModel(data)
    return mes.save()
}

const generateopenai = async(isExist,data)=>{
     const messages = [
        {
        role: 'system',
        content: `You are a helpful AI assistant. 
                    Answer clearly and concisely.
                    If you don't know something, say so honestly as "I don't Know about this".`
        },
        // Last 10 messages for context window management
        ...isExist?.map(m => ({
        role: m.role,
        content: m.content
        })),
        // Current user message
        { role: 'user', content: data.content }
    ];
    const aiconfig = await openAi.chat.completions.create({
        model :'gpt-4o',
        messages,
        temprature:0.4,
        max_tokens:600
    });
    const aireply = aiconfig.choices[0].message.content
    

}

const generateGemnini = async(isExist,data)=>{
    let contextText = ""
    let last10Messages = isExist.map(m=>{
         contextText += `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}\n`;})
    const finalPrompt = `You are a helpful AI assistant. Answer clearly and concisely.${contextText}User: ${data.content}Assistant:`;
    //call gemini 
    const result =  await geminiAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: finalPrompt
    });
    console.log(result.text)
    const aiReply = result.text;
    return aiReply
}

exports.findbychatid = async({chatid,page}) => {
    let limit = 6,
    skip = (page-1) *limit;
    let result = await messageModel.find({chatid})
                                    .select('content role updatedAt')
                                    .sort({_id:-1})
                                    .skip(skip)
                                    .limit(limit) 
                                    .then(docs => docs.reverse()) 
    return result                     
}