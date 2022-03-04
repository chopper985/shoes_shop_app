require('dotenv').config();
const envs = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    JWT_SECRET: process.env.JWT_SECRET,
    PASS: process.env.PASS,
    USER: process.env.USER,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
};
module.exports = envs;
