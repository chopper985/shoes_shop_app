const express = require('express');
const Controller = require('../controllers/order.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');

router.get('/cancel', Controller.cancelPayment);
router.get('/successVnPay', Controller.successVnPayOrder);
router.get('/success', Controller.paymentSuccess);
router.put('/update', verifyToken, Controller.updateOrder);
router.put('/updateStatus', verifyToken, Controller.updateStatusOrder);
router.get('/', verifyToken, Controller.getOrder);
router.post(
    '/getStatictisByYear',
    verifyToken,
    admin,
    Controller.getStatictisByYear,
);
router.post('/getOrderStatus', verifyToken, Controller.getOrderByStatus);
router.put('/delete', verifyToken, admin, Controller.deleteOrder);
router.get('/all', verifyToken, Controller.getAllOrder);
router.post('/create', verifyToken, Controller.createOrder);

module.exports = router;
