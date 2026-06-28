  const { body } = require('express-validator');

  exports.registerValidation = [

  body('username')    
    // .optional()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
    
  body('mobile')
    .isLength({ min: 10,max:10 })
    .withMessage('Mobile number must be 10 numbers'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  ];
 exports.loginValidation = [
    
  body('mobile')
    .isLength({ min: 10,max:10 })
    .withMessage('Mobile number must be 10 numbers'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  ];

