const AppError = require("../utils/appError");
const { Message_UNAUTHORIZED } = require("../utils/errorMessage");
const { NOT_FOUND, UNAUTHORIZED } = require("../utils/HttpStatus");
const { verifyAccessToken, verifyRefreshToken } = require("../utils/jwttkoken");

module.exports = (req, res, next) => {
  const token = req.cookies.accessToken;  // 👈 get from cookie
  const refreshtoken = req.cookies.refreshToken;  // 👈 get from cookie
  
  if (!token) {
       return next(new AppError(Message_UNAUTHORIZED,UNAUTHORIZED,{error:Message_UNAUTHORIZED}));
  }
  try {
    const decoded = verifyAccessToken(token);
    const decodedrefresh = verifyRefreshToken(refreshtoken);
    if(decoded?._id != decodedrefresh?._id)   return next(new AppError(Message_UNAUTHORIZED,UNAUTHORIZED,{error:Message_UNAUTHORIZED}));
      req.user = decoded;
      next();
  } catch (err) {
    return next(new AppError(Message_UNAUTHORIZED,UNAUTHORIZED,{error:Message_UNAUTHORIZED}));
  }
};