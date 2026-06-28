var CryptoJS = require("crypto-js");
const { CRYPTO_SECRET } = require("../config/config");
// Encrypt
exports.encryptCrypto = (text) => {
    return CryptoJS.AES.encrypt(text, CRYPTO_SECRET).toString();
}
// Decrypt
exports.decryptCrypto = (text) => {
    var bytes  = CryptoJS.AES.decrypt(text, CRYPTO_SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
}