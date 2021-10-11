const UserService = require('../services/user.service');
const BaseController = require('./baseController');
var jwt = require('jsonwebtoken');
var { JWT_SECRET } = require('../commons/configs/env');
const bcrypt = require('bcrypt');

class UserController {
    constructor() {}
    //[POST] /api/user/register
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
            var salt = await bcrypt.genSalt(10);
            result.password = await bcrypt.hash(result.password, salt);
            result.save();
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
    //[POST] /api/user/login
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
            var token = jwt.sign(
                { _id: result._id, role: result.role },
                JWT_SECRET,
            );
            return BaseController.sendSuccess(
                res,
                token,
                201,
                'Login Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/user/all
    async getAllUser(req, res) {
        try {
            UserService.getAllUser().then((user) => {
                if (user === null) {
                    return BaseController.sendSuccess(
                        res,
                        null,
                        300,
                        'Get All Failed!',
                    );
                }
                return BaseController.sendSuccess(
                    res,
                    user,
                    201,
                    'Get All Success!',
                );
            });
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/user/:id
    async getUser(req, res) {
        try {
            const user = await UserService.getUser(
                req.value.body.decodeToken._id,
            );
            if (user === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get User Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                user,
                201,
                'Get User Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[POST] /api/user/
    async updateUser(req, res) {
        try {
            const car = await CarService.updateUser(
                req.query.updateId,
                req.body,
            );
            if (car === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Update  Failed!',
                );
            }
            return BaseController.sendSuccess(res, car, 201, 'Update Success!');
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
}

module.exports = new UserController();
