const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Address = new Schema(
    {
        district: {
            type: String,
        },
        ward: {
            type: String,
        },
        street: {
            type: String,
        },
        status: {
            type: Boolean,
        },
        nameReciever: {
            type: String,
        },
        phoneReciever: {
            type: Number,
        },
        idAccount: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Address', Address);
