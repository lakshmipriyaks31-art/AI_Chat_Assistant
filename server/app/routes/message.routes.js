const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const authMiddleware = require("../../middleware/auth.middleware");
const { newmessage } = require("../controller/message.controller");

const route = express.Router()

route.post('/',authMiddleware,asyncHandler(newmessage))

module.exports = route