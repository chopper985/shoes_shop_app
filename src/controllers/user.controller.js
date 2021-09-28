const UserService = require('../services/user.service');
const BaseController = require('./baseController');

class UserController {
    constructor() {}
    async createUser(req, res) {
        try {
            const result = await UserService.create(req.body);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Create User Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                201,
                'Create User Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    async login(req, res) {
        try {
            const result = await UserService.login(req.body);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Login Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                201,
                'Login Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
}

module.exports = new UserController();
