const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema(
    {
        lstCart: {
            type: Array,
            required: true,
        },
        idAccount: {
            type: String,
        },
        status: {
            type: Number,
            default: 1,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        statusPayment: {
            type: Boolean,
            required: true,
        },
        address: {
            type: Array,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Order', Order);
//Status 1- Order, 2 - Package, 3 - In transit, 4- Delivery, 5 - Cancel
