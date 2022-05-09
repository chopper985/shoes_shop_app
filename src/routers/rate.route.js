const express = require('express');
const Controller = require('../controllers/rating.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');

router.put('/updateRateByAccount', verifyToken, Controller.updateRateByAccount);
// router.get('/getRateNumberByIdProduct', verifyToken, Controller.getRateNumberByIdProduct);
router.get(
    '/getRateProductByAccount',
    verifyToken,
    Controller.getRateProductByAccount,
);
router.post('/create', verifyToken, Controller.createRate);

module.exports = router;
