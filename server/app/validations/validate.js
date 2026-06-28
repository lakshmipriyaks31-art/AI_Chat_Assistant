const { validationResult } = require("express-validator");
const { UNPROCESSABLE_ENTITY } = require("../../utils/HttpStatus");
const { Message_UNPROCESSABLE_ENTITY } = require("../../utils/errorMessage");
const AppError = require("../../utils/appError");


module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = (errors.array()).map(err => ({
    [`${err.path}`]: err.msg,
    }))
    .reduce((acc, err) => {
        const key = Object.keys(err)[0];
        acc[key] = err[key];
        return acc;
      }, {});
    return next(new AppError(Message_UNPROCESSABLE_ENTITY,UNPROCESSABLE_ENTITY,formattedErrors ));
  }
  next();
};