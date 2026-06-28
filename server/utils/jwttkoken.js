const jwt = require('jsonwebtoken')
const { JWT, JWT_REFRESH } = require('../config/config');
const { encryptCrypto, decryptCrypto } = require('./crypto');
 
exports.generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT, {
    expiresIn: '15m',
  });
};

exports.generateRefreshToken = (payload) => {
  return encryptCrypto(jwt.sign(payload, JWT_REFRESH, {
    expiresIn: '7d',
  }));
};

exports.verifyAccessToken = (token) => {
  return jwt.verify(token, JWT);
};

exports.verifyRefreshToken = (token) => {
   token =decryptCrypto(token)
  return jwt.verify(token, JWT_REFRESH)
   
};

