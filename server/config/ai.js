const { OPEN_AI_KEY, GEMINI } = require("./config");
const OpenAI = require('openai');
const { GoogleGenAI } = require('@google/genai');

exports.openAi = new OpenAI({ 
  apiKey: OPEN_AI_KEY
});


exports.geminiAI =  new GoogleGenAI({apiKey:GEMINI})
