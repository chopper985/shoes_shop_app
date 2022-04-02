const OrderService = require('../services/order.service');
const BaseController = require('./baseController');

class OrderController {
    constructor() {}
    //[POST] /api/order/create
    async createOrder(req, res) {
        try {
            const result = await OrderService.create(req.body);
            result.idAccount = req.value.body.decodeToken._id;
            result.save();
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Create Order Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                201,
                'Create Order Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/order/getAllOrder
    async getAllOrder(req, res) {
        try {
            OrderService.getAllOrder({
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
    //[GET] /api/order/getOrderByStatus
    async getOrderByStatus(req, res) {
        try {
            if (req.value.body.decodeToken.role === 'ADMIN') {
                const result = await OrderService.getAllOrder({
                    status: req.body.status,
                    isDeleted: false,
                });
                if (result === null) {
                    return BaseController.sendSuccess(
                        res,
                        null,
                        300,
                        'Get Order Failed!',
                    );
                }
                return BaseController.sendSuccess(
                    res,
                    result,
                    201,
                    'Get Order Success!',
                );
            } else {
                const result = await OrderService.getAllOrder({
                    idAccount: req.value.body.decodeToken._id,
                    status: req.body.status,
                    isDeleted: false,
                });
                if (result === null) {
                    return BaseController.sendSuccess(
                        res,
                        null,
                        300,
                        'Get Order Failed!',
                    );
                }
                return BaseController.sendSuccess(
                    res,
                    result,
                    201,
                    'Get Order Success!',
                );
            }
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/order/getOrder/{getId}
    async getOrder(req, res) {
        try {
            const result = await OrderService.getAllOrder({
                _id: req.query.getId,
                idAccount: req.value.body.decodeToken._id,
                isDeleted: false,
            });
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Order Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                201,
                'Get Order Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[POST] /api/order/update
    async updateOrder(req, res) {
        try {
            const order = await OrderService.updateOrder(
                req.body._id,
                req.body,
            );
            if (order === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Update  Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                order,
                201,
                'Update Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[Put] /api/order/changeStatus/:id
    async updateStatusOrder(req, res) {
        try {
            const order = await OrderService.getOrder(req.body._id);
            if (order) {
                order.status = req.body.status;
                order.save();
                return BaseController.sendSuccess(
                    res,
                    null,
                    200,
                    'Update Success!',
                );
            }
            return BaseController.sendSuccess(
                res,
                null,
                300,
                'Update  Failed!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[DELETE] /api/order/delete/:id
    async deleteOrder(req, res) {
        try {
            const result = await OrderService.findById(req.query.getId);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Order Failed!',
                );
            }
            result.isDeleted = true;
            result.save();
            return BaseController.sendSuccess(
                res,
                result,
                201,
                'Get Order Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
}

module.exports = new OrderController();
