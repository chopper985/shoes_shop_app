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
            type: Int16Array,
        },
        idAccount: {
            type: String,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Address', Address);
