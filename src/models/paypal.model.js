const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Paypal = new Schema(
    {
        idPaypal: { type: String, required: true },
        Transaction: { type: String, required: true },
        idOrder: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Paypal', Paypal);
