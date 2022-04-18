const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Rate = new Schema(
    {
        idAccount: {
            type: String,
        },
        idProduct: {
            type: String,
            require: true,
        },
        rating: {
            type: Number,
            require: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Rate', Rate);
