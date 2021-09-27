class BaseController {
    constructor(){}
    sendSuccess (res, data, status = 200, message = 'success') {
        return res.status(status).json({
            message: message,
            data: data
        });
    };

    sendError (res, message) {
        return res.status(500).json({
            message: message || 'internal server error'
        });
    };


} module.exports = new BaseController();