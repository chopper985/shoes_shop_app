const express = require('express');
const Controller = require('../controllers/voucher.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');
const cpUpload = require('../validators/uploadImage');

router.put('/update', cpUpload, verifyToken, admin, Controller.updateVoucher);
router.get('/', verifyToken, admin, Controller.getVoucher);
router.post(
    '/getVoucherByVoucherCode',
    verifyToken,
    Controller.getVoucherByVoucherCode,
);
router.put('/delete', verifyToken, admin, Controller.deleteVoucher);
router.get('/all', verifyToken, admin, Controller.getAllVoucher);
router.post('/create', cpUpload, verifyToken, admin, Controller.createVoucher);

module.exports = router;
