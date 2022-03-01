const mongoose = require('mongoose');
const addressModel = require('./address.model');
const cartModel = require('./cart.model');
const Schema = mongoose.Schema;

const Order = new Schema(
    {
        lstCart: {
            type: [cartModel],
            required: true,
        },
        idAccount: {
            type: String,
            required: true,
        },
        status: {
            type: Int16Array,
            required: true,
        },
        totalPrice: {
            type: Float64Array,
            required: true,
        },
        statusPayment: {
            type: Boolean,
            required: true,
        },
        address: {
            type: addressModel,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Order', Order);
