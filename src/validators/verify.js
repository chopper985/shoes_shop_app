var jwt = require('jsonwebtoken');
var { JWT_SECRET } = require('../commons/configs/env');
const BaseController = require('../controllers/baseController');

const verifyToken = (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header) {
            res.status(403).json({
                data: {
                    tokenVerificationData: {
                        access: false,
                        message: 'No token provided',
                    },
                },
            });
            return;
        }
        const token = header.split(' ')[1];
        const decode = jwt.verify(
            token,
            JWT_SECRET,
            (err, decodedFromToken) => {
                if (err) {
                    res.status(403).json({
                        data: {
                            tokenVerificationData: {
                                access: false,
                                message: 'Failed to verify token',
                            },
                        },
                    });
                    return;
                } else {
                    req.value = {
                        body: { decodeToken: decodedFromToken, token },
                    };
                    next();
                }
            },
        );
    } catch (error) {
        console.log(error);
        return BaseController.sendError(res, 'Unauthorization');
    }
};
module.exports = verifyToken;
