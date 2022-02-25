const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const About = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        branch: {
            type: String,
            required: true,
        },
        facebook: {
            type: String,
            required: true,
        },
        insta: {
            type: String,
            required: true,
        },
        zalo: {
            type: Int16Array,
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('About', About);
