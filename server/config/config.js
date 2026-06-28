require('dotenv').config({path:'./.env'})
module.exports = {
    PORT : process.env.PORT,
    MONGO_URI : process.env.MONGO_URI,
    OPEN_AI_KEY : process.env.OPEN_AI_KEY,
    JWT:process.env.jwtSecret,
    JWT_REFRESH:process.env.jwtrefreshSecret,
    CRYPTO_SECRET:process.env.cryptoSecret,
    GEMINI:process.env.GEMINI,
}