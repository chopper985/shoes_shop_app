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
        totalDiscount: {
            type: Number,
            default: 0,
        },
        totalShipping: {
            type: Number,
            required: true,
            default: 0,
        },
        totalPriceProduct: {
            type: Number,
            required: true,
            default: 0,
        },
        totalPrice: {
            type: Number,
            default: 0,
        },
        statusPayment: {
            type: Boolean,
            required: true,
        },
        address: {
            type: Object,
            required: true,
        },
        voucher: {
            type: String,
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
