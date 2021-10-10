var jwt = require('jsonwebtoken');
var { JWT_SECRET } = require('../commons/configs/env');
const BaseController = require('../controllers/baseController');

const admin = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        const decode = jwt.verify(token, JWT_SECRET);
        if (decode.role === 'USER') {
            return BaseController.sendSuccess(
                res,
                null,
                201,
                'Unauthorization!',
            );
        }
        next();
    } catch (error) {
        return BaseController.sendError(res, 'Unauthorization');
    }
};
module.exports = admin;
