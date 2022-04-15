const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Company = new Schema(
    {
        nameCompanyVi: {
            type: String,
            required: true,
        },
        nameCompanyEn: {
            type: String,
            required: true,
        },
        logoCompany: {
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

module.exports = mongoose.model('Company', Company);
