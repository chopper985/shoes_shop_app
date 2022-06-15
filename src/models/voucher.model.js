const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Voucher = new Schema(
    {
        title: {
            type: String,
            required: true,
            default: '',
        },
        image: {
            type: String,
            default: '',
        },
        voucherCode: {
            type: String,
            default: '',
        },
        discount: {
            type: Number,
            required: true,
            default: 0,
        },
        maxDiscount: {
            type: Number,
            required: true,
            default: 0,
        },
        expiry: {
            type: Date,
            default: new Date(),
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Voucher', Voucher);
