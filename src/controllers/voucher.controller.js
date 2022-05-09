const VoucherService = require('../services/voucher.service');
const BaseController = require('./baseController');
var randomString = require('../validators/randomString');

class VoucherController {
    constructor() {}
    //[POST] /api/voucher/create
    async createVoucher(req, res) {
        try {
            const result = await VoucherService.create(req.body);
            const voucherCode = randomString(6);
            result.voucherCode = voucherCode;
            result.save();
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Create Voucher Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                200,
                'Create Voucher Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/voucher/getAllVoucher
    async getAllVoucher(req, res) {
        try {
            VoucherService.getAllVoucher({ isDeleted: false }).then(
                (voucher) => {
                    if (voucher === null) {
                        return BaseController.sendSuccess(
                            res,
                            null,
                            300,
                            'Get All Failed!',
                        );
                    }
                    return BaseController.sendSuccess(
                        res,
                        voucher,
                        200,
                        'Get All Success!',
                    );
                },
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/voucher/getVoucherByVoucherCode/{code}
    async getVoucherByVoucherCode(req, res) {
        try {
            const rs = await VoucherService.getVoucherByVoucherCode({
                voucherCode: req.body.voucher,
                isDeleted: false,
                expiry: {
                    $gt: req.body.date,
                },
            });
            if (rs === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Voucher Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                rs,
                200,
                'Get Voucher Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/voucher/getVoucher/{getId}
    async getVoucher(req, res) {
        try {
            console.log(req.query.getId);
            const result = await VoucherService.getVoucher({
                _id: req.query.getId,
                isDeleted: false,
            });
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Voucher Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                200,
                'Get Voucher Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[POST] /api/voucher/update
    async updateVoucher(req, res) {
        try {
            const voucher = await VoucherService.updateVoucher(
                req.body._id,
                req.body,
            );
            if (voucher === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Update  Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                voucher,
                200,
                'Update Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[DELETE] /api/voucher/delete/:id
    async deleteVoucher(req, res) {
        try {
            const result = await VoucherService.findById(req.query.getId);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Voucher Failed!',
                );
            }
            result.isDeleted = true;
            result.save();
            return BaseController.sendSuccess(
                res,
                result,
                200,
                'Get Voucher Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
}

module.exports = new VoucherController();
