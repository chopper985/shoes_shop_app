const AddressService = require('../services/address.service');
const BaseController = require('./baseController');

class AddressController {
    constructor() {}
    //[POST] /api/address/create
    async createAddress(req, res) {
        try {
            const idAccount = req.value.body.decodeToken._id;
            const lstAddress = await AddressService.findAll({
                idAccount: idAccount,
                isDeleted: false,
            });
            const result = await AddressService.create(req.body);
            result.idAccount = req.value.body.decodeToken._id;
            if (lstAddress.length === 0) {
                result.status = true;
            }
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
                200,
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
                    200,
                    'Get All Success!',
                );
            });
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/address/getAddressDefaults
    async getAddressDefault(req, res) {
        try {
            const result = await AddressService.getAddress({
                idAccount: req.value.body.decodeToken._id,
                status: true,
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
                200,
                'Get Address Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/address/getAddress/{getId}
    async getAddress(req, res) {
        try {
            const result = await AddressService.getAddress({
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
                200,
                'Get Address Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[PUT] /api/address/changeStatusDefault
    async updateStatusDefault(req, res) {
        try {
            const addressUpdate = await AddressService.findAddressById(
                req.query.getId,
            );
            if (addressUpdate != null && addressUpdate.isDeleted === false) {
                const idAccount = req.value.body.decodeToken._id;
                const lstAddress = await AddressService.findOne({
                    idAccount: idAccount,
                    isDeleted: false,
                    status: true,
                });
                if (lstAddress != null) {
                    lstAddress.status = false;
                    lstAddress.save();
                }
                addressUpdate.status = true;
                addressUpdate.save();
                return BaseController.sendSuccess(
                    res,
                    addressUpdate,
                    200,
                    'Get Address Success!',
                );
            } else {
                return BaseController.sendSuccess(res, null, 404, 'Not Found!');
            }
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
                200,
                'Update Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[DELETE] /api/address/delete/:id
    async deleteAddress(req, res) {
        try {
            const result = await AddressService.findById(req.query.getId);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Address Failed!',
                );
            }
            result.isDeleted = true;
            result.save();
            return BaseController.sendSuccess(
                res,
                result,
                200,
                'Get Address Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
}

module.exports = new AddressController();
