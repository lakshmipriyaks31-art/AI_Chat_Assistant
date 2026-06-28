

const errorMiddleware = (err, req, res,next) => {
  

  const statusCode = err.statusCode || 200;

 res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errors: err.errors || null
  });
};

module.exports = errorMiddleware;