var {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
} = require('../commons/configs/env');
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sentOTP = (res, phoneNumber, title) => {
    client.messages
        .create({
            body: title,
            to: '+84' + Number(phoneNumber).toString(),
            from: '+18178932786',
        })
        .then((message) =>
            res.status(200).json({
                message: 'Send OTP Complete!',
                body: message,
            }),
        )
        // here you can implement your fallback code
        .catch((error) =>
            res.status(300).json({
                message: 'Send OTP Fail!',
                body: error,
            }),
        );
};

module.exports = sentOTP;
