const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const { chatroom, allchat,particularchat } = require("../controller/chat.controller");
const authMiddleware = require("../../middleware/auth.middleware");

const route = express.Router()

route.post('/',authMiddleware,asyncHandler(chatroom))
route.get('/',authMiddleware,asyncHandler(allchat))
route.get('/:chatid',authMiddleware,asyncHandler(particularchat))
route.delete('/',authMiddleware,asyncHandler(particularchat))

module.exports = route