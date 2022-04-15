const mongoose = require('mongoose');
const productModel = require('./product.model');
const Schema = mongoose.Schema;

const Cart = new Schema(
    {
        lstProduct: {
            type: Object,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        totalPrice: {
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

module.exports = mongoose.model('Cart', Cart);
