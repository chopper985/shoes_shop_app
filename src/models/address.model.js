const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Address = new Schema(
    {
        province: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        ward: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            default: false,
        },
        nameReciever: {
            type: String,
            required: true,
        },
        phoneReciever: {
            type: Number,
            required: true,
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
