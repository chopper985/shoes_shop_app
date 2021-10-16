const nodemailer = require('nodemailer');
var { USER, PASS } = require('../commons/configs/env');

const sendEmail = async (email, subject, text, res) => {
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

        return res.status(200).json({
            message: 'Send Email Complete!',
        });
    } catch (error) {
        return res.status(300).json({
            message: 'Send Email Fail!',
        });
    }
};

module.exports = sendEmail;
