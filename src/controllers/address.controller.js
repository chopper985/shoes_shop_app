const AddressService = require('../services/address.service');
const BaseController = require('./baseController');

class AddressController {
    constructor() {}
    //[POST] /api/address/create
    async createAddress(req, res) {
        try {
            const result = await AddressService.create(req.body);
            result.idAccount = req.value.body.decodeToken._id;
            result.save();
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Create Address Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                201,
                'Create Address Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/addresses/getAllAddress
    async getAllAddress(req, res) {
        try {
            AddressService.getAllAddress({
                idAccount: req.value.body.decodeToken._id,
                isDeleted: false,
            }).then((product) => {
                if (product === null) {
                    return BaseController.sendSuccess(
                        res,
                        null,
                        300,
                        'Get All Failed!',
                    );
                }
                return BaseController.sendSuccess(
                    res,
                    product,
                    201,
                    'Get All Success!',
                );
            });
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/address/getAddress/{getId}
    async getAddress(req, res) {
        try {
            const result = await AddressService.getAllAddress({
                _id: req.query.getId,
                isDeleted: false,
            });
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Address Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                201,
                'Get Address Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[POST] /api/address/update
    async updateAddress(req, res) {
        try {
            const address = await AddressService.updateAddress(
                req.body._id,
                req.body,
            );
            if (address === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Update  Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                address,
                201,
                'Update Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[DELETE] /api/address/delete/:id
    async deleteAddress(req, res) {
        try {
            const result = await AddressService.getAddress(req.query.getId);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Address Failed!',
                );
            }
            result.isDelete = true;
            result.save();
            return BaseController.sendSuccess(
                res,
                result,
                201,
                'Get Address Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
}

module.exports = new AddressController();
