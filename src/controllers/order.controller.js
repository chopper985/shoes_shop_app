const paypal = require('paypal-rest-sdk');
//Service
const OrderService = require('../services/order.service');
const ProductService = require('../services/product.service');
const VoucherService = require('../services/voucher.service');
const cartService = require('../services/cart.service');
//Model
const paypalModel = require('../models/paypal.model');
const orderModel = require('../models/order.model');
const productModel = require('../models/product.model');
const BaseController = require('./baseController');
//middleware
const { GHTK_TOKEN } = require('../commons/configs/env');
var getDayEnd = require('../validators/getDayEnd');
const axios = require('axios').default;
const {
    paymentMethod,
    FormatDollar,
    paymentSuccess,
    sortObject,
    cancelPayment,
    RefundPayment,
} = require('../validators/payment');

class OrderController {
    constructor() {}
    //[POST]
    async successVnPayOrder(req, res) {
        var vnp_Params = req.query;
        var secureHash = vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];
        var amount = vnp_Params['vnp_Amount'] / 100;
        var id = vnp_Params['vnp_OrderInfo'];
        vnp_Params = sortObject(vnp_Params);
        var tmnCode = 'DRM6I5GB';
        var secretKey = 'MMENFKYXTFJSRVONJRTNASXCFCYCHPDE';
        var querystring = require('qs');
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require('crypto');
        var hmac = crypto.createHmac('sha512', secretKey);
        var signed = hmac
            .update(new Buffer.from(signData, 'utf-8'))
            .digest('hex');

        if (secureHash === signed) {
            res.send({
                message: 'Success',
                paymentId: id,
                amount: amount,
            });
        } else {
            res.status(200).json({ code: '97', data: req.query });
        }
    }
    async paymentSuccess(req, res) {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        const price = req.query.price;
        const idDonHang = req.query.idDonHang;
        var update = { typePayment: 'PayPal' };
        const execute_payment_json = {
            payer_id: payerId,
            transactions: [
                {
                    amount: {
                        currency: 'USD',
                        total: `${price}`,
                    },
                },
            ],
        };
        paypal.payment.execute(
            paymentId,
            execute_payment_json,
            async function (error, payment) {
                if (error) {
                    res.send('Payment Fail');
                } else {
                    await orderModel.findOneAndUpdate(
                        { _id: idDonHang },
                        update,
                        {
                            new: true,
                        },
                    );

                    await paypalModel.create({
                        idOrder: idDonHang,
                        Transaction: price,
                        idPaypal:
                            payment.transactions[0].related_resources[0].sale
                                .id,
                    });
                    res.send({
                        message: 'Success',
                        paymentId:
                            payment.transactions[0].related_resources[0].sale
                                .id,
                        id_Order: idDonHang,
                    });
                }
            },
        );
    }
    //[]
    async cancelPayment(req, res) {
        res.send('Payment is canceled');
    }
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
                            // Voucher
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
                        await axios
                            .get(
                                'https://services.giaohangtietkiem.vn/services/shipment/fee',
                                {
                                    params: {
                                        address:
                                            result.address.street +
                                            ',' +
                                            result.address.ward +
                                            ',' +
                                            result.address.district,
                                        province: result.address.province,
                                        district: result.address.district,
                                        pick_province: 'Hồ Chí Minh',
                                        pick_district: 'Thủ Đức',
                                        weight: 5,
                                    },
                                    headers: { Token: GHTK_TOKEN },
                                },
                            )
                            .then(function (response) {
                                console.log(response.data);
                                result.totalShipping = response.data.fee.fee;
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                            .then(function () {
                                // always executed
                            });
                        result.totalPrice =
                            result.totalPriceProduct -
                            result.totalDiscount -
                            result.totalShipping;
                        console.log(result.totalPrice);
                        console.log(result.totalPriceProduct);
                        console.log(result.totalDiscount);
                        console.log(result.totalShipping);
                        await result.save();
                        if (result === null) {
                            return BaseController.sendSuccess(
                                res,
                                null,
                                300,
                                'Create Order Failed!',
                                npom,
                            );
                        }
                        for (var i = 0; i < result.lstCart.length; i++) {
                            // Cart
                            const cart = await cartService.getCart({
                                _id: result.lstCart[i]._id,
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
                            cart.isDeleted = true;
                            cart.save();
                            // Product
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
                        var resultPayment;
                        var changePriceOrder = FormatDollar(
                            result.totalPrice / 24000,
                        );
                        // Payment - Paypal
                        if (req.body.typePayment === 'Paypal') {
                            await paymentMethod(
                                changePriceOrder,
                                result._id,
                                async function (error, payment) {
                                    if (error) {
                                        resultPayment = error;
                                    } else {
                                        for (
                                            let i = 0;
                                            i < payment.links.length;
                                            i++
                                        ) {
                                            if (
                                                payment.links[i].rel ===
                                                'approval_url'
                                            ) {
                                                resultPayment =
                                                    payment.links[i].href;
                                                return BaseController.sendSuccess(
                                                    res,
                                                    resultPayment,
                                                    200,
                                                    'Success',
                                                );
                                            }
                                        }
                                    }
                                },
                            );
                        } else if (req.body.typePayment === 'VnPay') {
                            var ipAddr =
                                req.headers['x-forwarded-for'] ||
                                req.connection.remoteAddress ||
                                req.socket.remoteAddress ||
                                req.connection.socket.remoteAddress;
                            var tmnCode = 'DRM6I5GB';
                            var secretKey = 'MMENFKYXTFJSRVONJRTNASXCFCYCHPDE';
                            var vnpUrl =
                                'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
                            var returnUrl =
                                'https://lt-shoes-shop.herokuapp.com/api/order/successVnPay';
                            var date = new Date();
                            var createDate =
                                date.getFullYear() +
                                ('0' + (date.getMonth() + 1)).slice(-2) +
                                ('0' + date.getDate()).slice(-2) +
                                ('0' + date.getHours()).slice(-2) +
                                ('0' + date.getMinutes()).slice(-2) +
                                ('0' + date.getSeconds()).slice(-2);
                            var orderId = createDate.slice(8, 14);
                            var amount = result.totalPrice;
                            var bankCode = 'NCB';
                            var orderInfo = result._id;
                            var orderType = 'other';
                            var locale = 'vn';
                            var currCode = 'VND';
                            var vnp_Params = {};
                            vnp_Params['vnp_Version'] = '2.1.0';
                            vnp_Params['vnp_Command'] = 'pay';
                            vnp_Params['vnp_TmnCode'] = tmnCode;
                            vnp_Params['vnp_Locale'] = locale;
                            vnp_Params['vnp_CurrCode'] = currCode;
                            vnp_Params['vnp_TxnRef'] = orderId;
                            vnp_Params['vnp_OrderInfo'] = orderInfo;
                            vnp_Params['vnp_OrderType'] = orderType;
                            vnp_Params['vnp_Amount'] = amount * 100;
                            vnp_Params['vnp_ReturnUrl'] = returnUrl;
                            vnp_Params['vnp_IpAddr'] = ipAddr;
                            vnp_Params['vnp_CreateDate'] = createDate;
                            if (bankCode !== null && bankCode !== '') {
                                vnp_Params['vnp_BankCode'] = bankCode;
                            }
                            vnp_Params = sortObject(vnp_Params);
                            var querystring = require('qs');
                            var signData = querystring.stringify(vnp_Params, {
                                encode: false,
                            });
                            var crypto = require('crypto');
                            var hmac = crypto.createHmac('sha512', secretKey);
                            var signed = hmac
                                .update(Buffer.from(signData, 'utf-8'))
                                .digest('hex');
                            vnp_Params['vnp_SecureHash'] = signed;
                            vnpUrl +=
                                '?' +
                                querystring.stringify(vnp_Params, {
                                    encode: false,
                                });

                            return BaseController.sendSuccess(
                                res,
                                vnpUrl,
                                200,
                                'Success',
                            );
                        } else {
                            return BaseController.sendSuccess(
                                res,
                                'Success',
                                200,
                                'Create Order Success!',
                            );
                        }
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
                }).then((order) => {
                    if (order === null) {
                        return BaseController.sendSuccessTotal(
                            res,
                            null,
                            0,
                            300,
                            'Get All Failed!',
                        );
                    }
                    return BaseController.sendSuccessTotal(
                        res,
                        order,
                        order.length,
                        200,
                        'Get All Success!',
                    );
                });
            } else {
                OrderService.getAllOrder({
                    idAccount: req.value.body.decodeToken._id,
                    isDeleted: false,
                }).then((order) => {
                    if (order === null) {
                        return BaseController.sendSuccess(
                            res,
                            null,
                            300,
                            'Get All Failed!',
                        );
                    }
                    return BaseController.sendSuccess(
                        res,
                        order,
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
                    return BaseController.sendSuccessTotal(
                        res,
                        null,
                        0,
                        300,
                        'Get Order Failed!',
                    );
                }
                return BaseController.sendSuccessTotal(
                    res,
                    result,
                    result.length,
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
                console.log(req.body.status === 5);
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
                            (t) => t.size === e.lstProduct.type.size,
                        );
                        if (index !== -1) {
                            product.type[index].quantity += e.amount;
                            product.quantitySold -= e.amount;
                            await product.save();
                        }
                    });
                    console.log(order.typePayment);
                    if (order.typePayment === 'PayPal') {
                        await RefundPayment(
                            order._id,
                            async function (error, refund) {
                                if (error) {
                                    console.log(error);
                                    return BaseController.sendSuccess(
                                        res,
                                        null,
                                        300,
                                        'ERROR',
                                    );
                                } else {
                                    console.log(refund + 'TTTT');
                                }
                            },
                        );
                    } else if (req.body.typePayment === 'VNpay') {
                    }
                } else if (req.body.status === 4) {
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
