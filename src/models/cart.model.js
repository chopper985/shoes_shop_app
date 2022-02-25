const mongoose = require('mongoose');
const productModel = require('./product.model');
const Schema = mongoose.Schema;

const Cart = new Schema(
    {
        lstProduct: {
            type: productModel,
            required: true,
        },
        amount: {
            type: Int16Array,
            required: true,
        },
        totalPrice: {
            type: Float32Array,
            required: true,
        },
        idAccount: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Cart', Cart);
