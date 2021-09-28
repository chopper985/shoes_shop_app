const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Branch = new Schema(
    {
        branchName: {
            type: String,
            default: '',
        },
        branchAddress: {
            type: String,
            default: '',
        },
        branchPhoneNumber: {
            type: String,
            default: '',
        },
        branchStatus: {
            type: String,
            default: '',
        },
        branchOpeningTime: {
            type: String,
            default: '',
        },
        branchClosingTime: {
            type: String,
            default: '',
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Branch', Branch);
