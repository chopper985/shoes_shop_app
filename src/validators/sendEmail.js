const nodemailer = require('nodemailer');
var { USER, PASS } = require('../commons/configs/env');

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            service: 'gmail',
            auth: {
                user: USER,
                pass: PASS,
            },
        });

        await transporter.sendMail({
            from: USER,
            to: email,
            subject: subject,
            text: text,
        });

        console.log('Email sent sucessfully');
    } catch (error) {
        console.log(error, 'Email not sent');
    }
};

module.exports = sendEmail;
