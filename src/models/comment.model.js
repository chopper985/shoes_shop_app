const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        idAccount: {
            type: String,
            required: true,
        },
        idProduct: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        level: {
            type: Number,
            require: true,
        },
        idParent: {
            type: String,
            default: '',
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Comment', Comment);
