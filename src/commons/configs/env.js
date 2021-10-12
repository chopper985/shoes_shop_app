require('dotenv').config();
const envs = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    JWT_SECRET: process.env.JWT_SECRET,
    PASS: process.env.PASS,
    USER: process.env.USER,
    BASE_URL: process.env.BASE_URL,
};
module.exports = envs;
