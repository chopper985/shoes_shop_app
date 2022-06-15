const paypal = require('paypal-rest-sdk');
const orderModel = require('../models/order.model');
const paypalModel = require('../models/paypal.model');

exports.paymentMethod = async (price, idOrder, next) => {
    const create_payment_json = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal',
        },
        redirect_urls: {
            return_url: `https://lt-shoes-shop.herokuapp.com/api/order/success?price=${price}&idDonHang=${idOrder}`,
            cancel_url: `https://lt-shoes-shop.herokuapp.com/api/order/cancel`,
        },
        transactions: [
            {
                item_list: {
                    items: [
                        {
                            name: 'Tổng Tiền đơn hàng',
                            sku: '001',
                            price: `${price}`,
                            currency: 'USD',
                            quantity: 1,
                        },
                    ],
                },
                amount: {
                    currency: 'USD',
                    total: `${price}`,
                },
                description: 'Phí thanh toán ở LTShop',
            },
        ],
    };
    paypal.payment.create(create_payment_json, async (error, payment) => {
        await next(error, payment);
    });
};

exports.RefundPayment = async (idOrder, next) => {
    const resultPaypal = await paypalModel.findOne({ idOrder: idOrder });
    const data = {
        amount: {
            total: `${resultPaypal.Transaction}`,
            currency: 'USD',
        },
    };

    paypal.sale.refund(
        resultPaypal.idPaypal,
        data,
        async function (error, refund) {
            await next(error, refund);
        },
    );
};

exports.cancelPayment = (req, res, next) => {
    res.send('Payment is canceled');
};

exports.sortObject = (obj) => {
    var sorted = {};
    var str = [];
    var key;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
            /%20/g,
            '+',
        );
    }
    return sorted;
};
exports.FormatDollar = (tienDo) => {
    var tienDo2f = Math.round(tienDo * 100) / 100;
    var tienDo3f = Math.round(tienDo * 1000) / 1000;
    return tienDo % tienDo2f == 0
        ? tienDo2f
        : tienDo2f > tienDo3f
        ? tienDo2f
        : tienDo2f + 0.01;
};
