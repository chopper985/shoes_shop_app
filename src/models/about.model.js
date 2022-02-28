const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const About = new Schema(
    {
        email: {
            type: String,
            required: true,
            default: 'dongngotngao985@gmail.com',
        },
        description: {
            type: String,
            required: true,
            default: '',
        },
        branch: {
            type: String,
            required: true,
            default: '',
        },
        facebook: {
            type: String,
            required: true,
            default: 'https://www.facebook.com/profile.php?id=100013564357757',
        },
        insta: {
            type: String,
            required: true,
            default: '',
        },
        zalo: {
            type: String,
            required: true,
            default: '0392886659',
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('About', About);
