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
            type: Array,
            required: true,
            default: '',
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
        quantitySold: {
            type: Number,
            default: 0,
        },
        type: {
            type: [{ size: String, quantity: Number, color: String }],
            default: [],
        },
        discount: {
            type: Number,
            default: 0,
        },
        // size: {
        //     required: true,
        //     type: String,
        // },
        // color: {
        //     type: String,
        //     required: true,
        // },
        // quantity: {
        //     type: Number,
        //     required: true,
        // },
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
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Product', Product);
