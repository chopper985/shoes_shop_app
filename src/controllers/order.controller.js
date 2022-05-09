const OrderService = require('../services/order.service');
const ProductService = require('../services/product.service');
const VoucherService = require('../services/voucher.service');
const BaseController = require('./baseController');
var getDayEnd = require('../validators/getDayEnd');
const productModel = require('../models/product.model');
const CartService = require('../services/cart.service');
const cartService = require('../services/cart.service');

class OrderController {
    constructor() {}
    //[POST] /api/order/create
    async createOrder(req, res) {
        try {
            await OrderService.checkQuanlity(req.body.lstCart).then(
                async (rs) => {
                    console.log(rs);
                    if (rs !== -1) {
                        const result = await OrderService.create(req.body);
                        result.idAccount = req.value.body.decodeToken._id;
                        if (result.voucher !== null) {
                            console.log(result.createdAt);
                            const voucher =
                                await VoucherService.getVoucherByVoucherCode({
                                    voucherCode: result.voucher,
                                    isDeleted: false,
                                    expiry: {
                                        $gt: result.createdAt,
                                    },
                                });

                            if (voucher !== null) {
                                const priceDiscound =
                                    (result.totalPriceProduct *
                                        voucher.discount) /
                                    100;
                                if (priceDiscound > voucher.maxDiscount) {
                                    result.totalDiscount = voucher.maxDiscount;
                                } else {
                                    result.totalDiscount = priceDiscound;
                                }
                                voucher.quanlity -= 1;
                                await voucher.save();
                            }
                        }
                        result.totalPrice =
                            result.totalPriceProduct -
                            result.totalDiscount -
                            result.totalShipping;
                        await result.save();
                        if (result === null) {
                            return BaseController.sendSuccess(
                                res,
                                null,
                                300,
                                'Create Order Failed!',
                            );
                        }
                        for (var i = 0; i < result.lstCart.length; i++) {
                            //Cart
                            const cart = await cartService.getCart({
                                _id: result.lstCart[i]._id,
                                isOrder: false,
                                isDeleted: false,
                            });
                            if (cart === null) {
                                return BaseController.sendSuccess(
                                    res,
                                    null,
                                    404,
                                    'Not Cart!',
                                );
                            }
                            cart.isOrdered = true;
                            cart.save();
                            //Product
                            const product = await productModel.findOne({
                                _id: result.lstCart[i].lstProduct._id,
                                isDeleted: false,
                            });
                            if (product === null) {
                                return BaseController.sendSuccess(
                                    res,
                                    null,
                                    404,
                                    'Not Found Product!',
                                );
                            }
                            product.type[rs].quantity -=
                                result.lstCart[i].amount;
                            product.quantitySold += result.lstCart[i].amount;
                            console.log(product.type[rs]);
                            await product.save();
                        }
                        return BaseController.sendSuccess(
                            res,
                            result,
                            200,
                            'Create Order Success!',
                        );
                    } else {
                        return BaseController.sendSuccess(
                            res,
                            null,
                            400,
                            'Product quantity is not enough!',
                        );
                    }
                },
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/order/getAllOrder
    async getAllOrder(req, res) {
        try {
            if (req.value.body.decodeToken.role === 'ADMIN') {
                OrderService.getAllOrder({
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
            } else {
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
                        200,
                        'Get All Success!',
                    );
                });
            }
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
                    200,
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
                    200,
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
            const result = await OrderService.getOrder({
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
                200,
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
                200,
                'Update Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[Put] /api/order/changeStatus/:id
    async updateStatusOrder(req, res) {
        try {
            const order = await OrderService.getOrderById(req.body._id);
            if (order) {
                order.status = req.body.status;
                if (req.body.status === 5) {
                    order.lstCart.forEach(async (e) => {
                        const product = await ProductService.getProduct({
                            _id: e.lstProduct._id,
                            isDeleted: false,
                        });
                        if (product === null) {
                            return BaseController.sendSuccess(
                                res,
                                null,
                                404,
                                'Not Found Product!',
                            );
                        }
                        var index = 0;
                        index = product.type.findIndex(
                            (t) =>
                                t.size === e.lstProduct.type.size &&
                                t.color === e.lstProduct.type.color,
                        );
                        if (index !== -1) {
                            product.type[index].quantity += e.amount;
                            product.quantitySold -= e.amount;
                            await product
                                .save()
                                .then((rs) => console.log(rs))
                                .catch((err) => console.log(err));
                        }
                    });
                }
                if (req.body.status === 4) {
                    order.statusPayment = true;
                }
                await order.save();

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
            await result.save();
            return BaseController.sendSuccess(
                res,
                result,
                200,
                'Get Order Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }

    //[POST] /api/order/statictisByYear
    async getStatictisByYear(req, res) {
        try {
            if (req.body.year === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    303,
                    'No Requests!',
                );
            }
            var lstStatictis = [];
            for (var i = 1; i < 13; i++) {
                var getDay = getDayEnd(i, req.body.year);
                console.log(getDay);
                console.log(i + 'TT');
                const lstOrder = await OrderService.getAllOrder({
                    updatedAt: {
                        $gte: new Date(req.body.year, i - 1, 1),
                        $lt: new Date(req.body.year, i - 1, getDay),
                    },
                    status: 4,
                    isDeleted: false,
                });
                if (lstOrder === null) {
                    lstStatictis.push(
                        new Object({ month: i, totalProfit: 0, quanlity: 0 }),
                    );
                    console.log(lstStatictis + '00000');
                } else {
                    var profit = 0;
                    var amountProduct = 0;
                    lstOrder.forEach((e) => {
                        profit += e.totalPrice;
                        e.lstCart.forEach((c) => {
                            amountProduct += c.amount;
                        });
                    });
                    console.log(
                        profit + 'month' + i + 'amount' + amountProduct,
                    );
                    lstStatictis.push(
                        new Object({
                            month: i,
                            totalProfit: profit,
                            quanlity: amountProduct,
                        }),
                    );
                }
            }
            return BaseController.sendSuccess(
                res,
                lstStatictis,
                200,
                'Get Order Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
}

module.exports = new OrderController();
