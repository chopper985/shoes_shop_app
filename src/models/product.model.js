const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema(
    {
        nameProduct: {
            type: String,
            required: true,
        },
        imageProduct: {
            type: String,
            required: true,
            default: '',
        },
        size: {
            required: true,
            type: String,
        },
        color: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
        },
        idCompany: {
            type: String,
            required: true,
            default: '',
        },
        price: {
            type: Number,
            required: true,
        },
        quanlity: {
            type: Number,
            required: true,
        },
        isDelete: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Product', Product);
