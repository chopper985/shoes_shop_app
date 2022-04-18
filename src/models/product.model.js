const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema(
    {
        nameProductVi: {
            type: String,
            required: true,
        },
        nameProductEn: {
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
        descriptionVi: {
            type: String,
            required: true,
        },
        descriptionEn: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            default: null,
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
        productCode: {
            type: String,
            required: true,
        },
        quanlity: {
            type: Number,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Product', Product);
