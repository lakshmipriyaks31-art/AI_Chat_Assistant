class AppError extends Error {
  constructor(message,statusCode, errors) {
   super(message);
    this.message = message;
    this.errors = errors
    this.statusCode = statusCode;
  }
}

module.exports = AppError;