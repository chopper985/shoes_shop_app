const RateService = require('../services/rate.service');
const ProductService = require('../services/product.service');
const BaseController = require('./baseController');

class RateController {
    constructor() {}
    //[POST] /api/rate/create
    async createRate(req, res) {
        try {
            const result = await RateService.create(req.body);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Create Rate Failed!',
                );
            }
            result.idAccount = req.value.body.decodeToken._id;
            result.save();
            var rateNumber = await RateService.getRateNumberByIdProduct(
                req.body.idProduct,
            );
            const product = await ProductService.getProduct({
                _id: req.body.idProduct,
                isDeleted: false,
            });
            if (product === null) {
            }
            console.log(product);
            product.rating = rateNumber;
            product.save();
            return BaseController.sendSuccess(
                res,
                result,
                201,
                'Create Rate Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/rate/getRateAccount
    async getRateProductByAccount(req, res) {
        try {
            await RateService.getOneRateByAccount({
                idProduct: req.body.idProduct,
                idAccount: req.value.body.decodeToken._id,
                isDeleted: false,
            }).then((rate) => {
                if (rate === null) {
                    return BaseController.sendSuccess(
                        res,
                        null,
                        300,
                        'Get Null!',
                    );
                }
                return BaseController.sendSuccess(
                    res,
                    rate,
                    201,
                    'Get Rate of Product by account!',
                );
            });
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/product/getProduct/{getId}
    async getProduct(req, res) {
        try {
            const result = await ProductService.getProduct({
                _id: req.query.getId,
                isDeleted: false,
            });
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Product Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                201,
                'Get Product Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    // [POST] /api/rate/update
    async updateRateByAccount(req, res) {
        try {
            const rate = await RateService.updateRate(req.body._id, req.body);
            if (rate === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Update  Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                rate,
                201,
                'Update Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
}

module.exports = new RateController();
