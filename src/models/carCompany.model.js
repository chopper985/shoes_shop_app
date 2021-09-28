const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarCompany = new Schema(
    {
        carCompanyName: {
            type: String,
            default: '',
        },
        logoCompany: {
            type: String,
            default: '',
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('CarCompany', CarCompany);
