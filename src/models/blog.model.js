const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Blog = new Schema(
    {
        contentVi: {
            type: String,
            required: true,
        },
        contentEn: {
            type: String,
            required: true,
        },
        time: {
            type: Date,
            default: Date.now(),
        },
        imageBlog: {
            type: String,
            required: true,
        },
        descriptionShortVi: {
            type: String,
            required: true,
        },
        descriptionShortEn: {
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

module.exports = mongoose.model('Blog', Blog);
