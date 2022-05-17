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
            return_url: `http://127.0.0.1:3000/api/order/success?price=${price}&idDonHang=${idOrder}`,
            cancel_url: `http://127.0.0.1:3000/api/order/cancel`,
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

// exports.paymentSuccess = (req, res) => {
//  const payerId = req.query.PayerID;
//  const paymentId = req.query.paymentId;
//  const price = req.query.price;
//  const idDonHang = req.query.idDonHang;
//  var update = { typePayment: 'PayPal' };
//  const execute_payment_json = {
//   payer_id: payerId,
//   transactions: [
//    {
//     amount: {
//      currency: 'USD',
//      total: `${price}`
//     }
//    }
//   ]
//  };
//  paypal.payment.execute(
//   paymentId,
//   execute_payment_json,
//   async function (error, payment) {
//    if (error) {
//     res.send('Payment Fail');
//    } else {
//     await orderModel.findOneAndUpdate({ _id: idDonHang }, update, {
//      new: true
//     });

//     await paypalModel.create({
//      idOrder: idDonHang,
//      Transaction: price,
//      idPaypal: payment.transactions[0].related_resources[0].sale.id
//     });
//     res.send({
//      message: 'Success',
//      paymentId: payment.transactions[0].related_resources[0].sale.id,
//      id_Order: idDonHang
//     });
//    }
//   }
//  );
// };

exports.cancelPayment = (req, res, next) => {
    res.send('Payment is canceled');
};

// exports.sortObject = obj => {
//  var sorted = {};
//  var str = [];
//  var key;

//  for (key in obj) {
//   if (obj.hasOwnProperty(key)) {
//    str.push(encodeURIComponent(key));
//   }
//  }
//  str.sort();
//  for (key = 0; key < str.length; key++) {
//   sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
//  }
//  return sorted;
// };
exports.FormatDollar = (tienDo) => {
    var tienDo2f = Math.round(tienDo * 100) / 100;
    var tienDo3f = Math.round(tienDo * 1000) / 1000;
    return tienDo % tienDo2f == 0
        ? tienDo2f
        : tienDo2f > tienDo3f
        ? tienDo2f
        : tienDo2f + 0.01;
};
