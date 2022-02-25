const express = require('express');
const AccountRouter = require('./account.route');
const ProductRouter = require('./product.route');
const ScheDuleRouter = require('./schedule.route');

const router = express.Router();
router.use('/product', ProductRouter);
router.use('/account', AccountRouter);
router.get('/', (req, res) => res.status(200).send('Welcome to SHOP'));

module.exports = router;
