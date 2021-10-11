const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Schedule = new Schema(
    {
        _idUser: {
            type: String,
            default: '',
        },
        userName: {
            type: String,
            default: '',
        },
        phoneNumber: {
            type: String,
            default: '',
        },
        email: {
            type: String,
            default: '',
        },
        carName: {
            type: String,
            default: '',
        },
        carId: {
            type: String,
            default: '',
        },
        time: {
            type: Date,
            default: '',
        },
        status: {
            type: String,
            default: '',
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Schedule', Schedule);
