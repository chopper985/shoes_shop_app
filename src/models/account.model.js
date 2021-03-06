const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const Account = new Schema(
    {
        fullName: {
            type: String,
        },
        avatar: {
            type: String,
        },
        gender: {
            type: Boolean,
        },
        birthday: {
            type: String,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
            match: /^0\d{9}$/,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        favourites: {
            type: Array,
            default: [],
        },
        role: {
            type: String,
            default: 'USER',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        otp: {
            type: Number,
            default: 0,
        },
        isCreatedOtp: {
            type: Date,
        },
    },
    { timestamps: true },
);
module.exports = mongoose.model('Account', Account);
const validate = (account) => {
    const schema = Joi.object({
        phoneNumber: Joi.string().length(10).required(),
        fullName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(account);
};
mongoose.exports = { Account, validate };
