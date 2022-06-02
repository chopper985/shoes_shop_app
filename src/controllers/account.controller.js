const AccountService = require('../services/account.service');
const BaseController = require('./baseController');
var jwt = require('jsonwebtoken');
var { JWT_SECRET, BASE_URL } = require('../commons/configs/env');
const bcrypt = require('bcrypt');
const SendEmail = require('../validators/sendEmail');
const SendOTP = require('../validators/otp');

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
                200,
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
            return BaseController.sendSuccess(res, data, 200, 'Login Success!');
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/account/all
    async getAllAccount(req, res) {
        try {
            AccountService.getAllAccount({ isDeleted: false }).then((user) => {
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
                    200,
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
            const user = await AccountService.getAccount({
                _id: req.value.body.decodeToken._id,
                isDeleted: false,
            });
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
                200,
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
                200,
                'Update Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[POST] /api/account/forgotPassword
    async sendOTP(req, res) {
        try {
            const user = await AccountService.reserPassword({
                phoneNumber: req.body.phoneNumber,
            });
            console.log(user);
            if (user) {
                var verify =
                    Math.floor(Math.random() * (999999 - 100000)) + 100000;
                user.otp = verify;
                user.isCreatedOtp = Date.now();
                user.save();
                return SendOTP(
                    res,
                    user.phoneNumber,
                    `Mã xác thực tài khoản của bạn là: ${verify}`,
                );
            }
            return BaseController.sendSuccess(res, null, 404, 'NOT FOUND');
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[POST]
    async submitOTP(req, res) {
        try {
            const user = await AccountService.reserPassword({
                phoneNumber: req.body.phoneNumber,
            });
            if (user) {
                const dateSendOTP = new Date(user.isCreatedOtp);
                const dateSubmitOTP = new Date(req.body.time);
                const difference = Math.abs(dateSubmitOTP - dateSendOTP);
                const minute = difference / (1000 * 60);
                if (minute >= 0 && minute <= 3) {
                    if (req.body.otp === user.otp) {
                        return BaseController.sendSuccess(
                            res,
                            null,
                            200,
                            'Submit Success',
                        );
                    }
                    return BaseController.sendSuccess(
                        res,
                        null,
                        400,
                        'OTP code is not correct',
                    );
                }
                return BaseController.sendSuccess(
                    res,
                    null,
                    400,
                    'OTP has been invalidated',
                );
            }
            return BaseController.sendSuccess(res, null, 404, 'NOT FOUND');
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[PUT]
    async resetPassword(req, res) {
        try {
            const user = await AccountService.reserPassword({
                phoneNumber: req.body.phoneNumber,
            });
            if (user) {
                var salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(
                    req.body.confirmPassword,
                    salt,
                );
                user.save();
                return BaseController.sendSuccess(
                    res,
                    null,
                    200,
                    'Reset Success',
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
            const user = await AccountService.getAccountById(
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
                    200,
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
    //[POST] /api/account/submitFavorite
    async submitFavorite(req, res) {
        try {
            const user = await AccountService.findById(
                req.value.body.decodeToken._id,
            );
            if (user === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    404,
                    'Not Found User',
                );
            }
            const index = user.favourites.indexOf(req.body.idProduct);
            if (index === -1) {
                user.favourites.splice(
                    user.favourites.lenght,
                    0,
                    req.body.idProduct,
                );
                user.save();
            } else {
                user.favourites.splice(index, 1);
                user.save();
            }
            return BaseController.sendSuccess(
                res,
                null,
                200,
                'Submit Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/account/getFavoriteAccount
    async getFavoriteAccount(req, res) {
        try {
            const user = await AccountService.findById(
                req.value.body.decodeToken._id,
            );
            if (user === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    404,
                    'Not Found User',
                );
            }
            return BaseController.sendSuccess(
                res,
                user.favourites,
                200,
                'Get Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
}

module.exports = new AccountController();
