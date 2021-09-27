const mongoose = require('mongoose')
const Schema = mongoose.Schema


const User = new Schema({
    displayName: {
        type: String, default: ''
    },
    userName: {
        type: String, default: ''
    },
    address: {
        type: String, default: ''
    },
    phone: {
        type: String, default: ''
    },
    password: {
        type: String, default: ''
    },
    avatar: {
        type: String, default: ''
    },
    role: {
        type: String, default: ''
    },
    shippingFee: {
        type: String, default: ''
    },
    fcm: {
        type: String, default: ''
    }
}, { timestamps: true });


module.exports = mongoose.model('User', User);