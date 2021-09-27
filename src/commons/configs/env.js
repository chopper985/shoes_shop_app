require('dotenv').config()
const envs = {
    MONGO_URI : process.env.MONGO_URI,
    PORT : process.env.PORT,
    HOST : process.env.HOST,
}
module.exports = envs;