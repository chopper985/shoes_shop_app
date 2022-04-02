const express = require('express');
const Controller = require('../controllers/cart.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');

router.post('/updateAmountCart', verifyToken, Controller.updateAmountCart);
router.get('/', verifyToken, Controller.getCart);
router.post('/delete', verifyToken, Controller.deleteCart);
router.get('/all', verifyToken, Controller.getAllCart);
router.post('/create', verifyToken, Controller.createCart);

module.exports = router;
