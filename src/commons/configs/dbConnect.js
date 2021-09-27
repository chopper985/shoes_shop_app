const mongoose = require('mongoose')
const { MONGO_URI } = require('./env')

async function connect() {
    try {
         await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connect successfully!')
    } catch (error) {
        console.log('connect fail!!',error)
    }
}

module.exports = { connect }