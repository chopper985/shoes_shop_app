const AccountService = require('../services/account.service');
const BaseController = require('./baseController');
var jwt = require('jsonwebtoken');
var { JWT_SECRET, BASE_URL } = require('../commons/configs/env');
const bcrypt = require('bcrypt');
const SendEmail = require('../validators/sendEmail');

class AccountController {
    constructor() {}
    //[POST] /api/user/register
    async createUser(req, res) {
        try {
            const result = await AccountService.create(req.body);

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
            const result = await AccountService.login(req.body);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Login Failed!',
                );
            }
            var data = {
                token: jwt.sign(
                    { _id: result._id, role: result.role },
                    JWT_SECRET,
                ),
                role: result.role,
            };
            return BaseController.sendSuccess(res, data, 201, 'Login Success!');
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/account/all
    async getAllAccount(req, res) {
        try {
            AccountService.getAllAccount().then((user) => {
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
    //[GET] /api/account/:id
    async getAccount(req, res) {
        try {
            const user = await AccountService.getAccount(
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
    //[POST] /api/account/
    async updateAccount(req, res) {
        try {
            const user = await AccountService.updateAccount(
                req.value.body.decodeToken._id,
                req.body,
            );
            if (user === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Update  Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                user,
                201,
                'Update Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[POST] /api/account/forgotPassword
    async resetPassword(req, res) {
        try {
            const user = await AccountService.reserPassword({
                email: req.body.email,
            });
            const password =
                Math.floor(Math.random() * (99999999 - 100000)) + 100000;
            var salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password.toString(), salt);
            user.save();
            if (user) {
                var token = jwt.sign({ _id: user._id }, JWT_SECRET, {
                    expiresIn: '5m',
                });
                return SendEmail(
                    user.email,
                    'Quên mật khẩu!',
                    `Mật khẩu mới của bạn là ${password}`,
                    res,
                );
            }
            return BaseController.sendSuccess(res, null, 404, 'NOT FOUND');
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[POST]
    async changePassword(req, res) {
        try {
            console.log(req.value.body.decodeToken._id);
            const user = await AccountService.getAccount(
                req.value.body.decodeToken._id,
            );
            if (user === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Not Permitted!',
                );
            }
            console.log(req.body.oldPassword);
            const validPassword = await bcrypt.compare(
                req.body.oldPassword,
                user.password,
            );
            console.log(validPassword);
            if (validPassword) {
                var salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.newPassword, salt);
                user.save();
                return BaseController.sendSuccess(
                    res,
                    user,
                    201,
                    'Change Password Success!',
                );
            } else {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Change Password Fail!',
                );
            }
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
}

module.exports = new AccountController();
