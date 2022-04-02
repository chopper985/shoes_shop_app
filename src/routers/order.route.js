const express = require('express');
const Controller = require('../controllers/order.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');

router.post('/update', verifyToken, Controller.updateOrder);
router.post('/updateStatus', verifyToken, Controller.updateStatusOrder);
router.get('/', verifyToken, Controller.getOrder);
router.get('/getOrderStatus', verifyToken, Controller.getOrderByStatus);
router.post('/delete', verifyToken, admin, Controller.deleteOrder);
router.get('/all', verifyToken, Controller.getAllOrder);
router.post('/create', verifyToken, Controller.createOrder);

module.exports = router;
