const express = require("express");
const { getUser , Register, Login, logout} = require("../controller/user.controller");
const asyncHandler = require("../../utils/asyncHandler");
const validate = require("../validations/validate");
const { registerValidation, loginValidation } = require("../validations/validation");
const authMiddleware = require("../../middleware/auth.middleware");

const route = express.Router()

route.get('/',authMiddleware, asyncHandler(getUser))
route.post('/register',registerValidation,validate,asyncHandler(Register))
route.post('/login',loginValidation,validate,asyncHandler(Login))
route.get('/logout',authMiddleware,asyncHandler(logout))


module.exports = route