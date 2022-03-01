const express = require('express');
const Controller = require('../controllers/address.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');

router.post('/update', verifyToken, Controller.updateAddress);
router.get('/', verifyToken, Controller.getAddress);
router.post('/delete', verifyToken, Controller.deleteAddress);
router.get('/all', verifyToken, Controller.getAllAddress);
router.post('/create', verifyToken, Controller.createAddress);

module.exports = router;
