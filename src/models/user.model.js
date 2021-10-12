const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const User = new Schema(
    {
        fullName: {
            type: String,
        },
        userName: {
            type: String,
            unique: true,
            required: true,
            minLength: 6,
            maxLength: 32,
        },
        address: {
            type: String,
        },
        gender: {
            type: String,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            minLength: 6,
            required: true,
        },
        role: {
            type: String,
            default: 'USER',
        },
    },
    { timestamps: true },
);
module.exports = mongoose.model('User', User);
const validate = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
};
mongoose.exports = { User, validate };
