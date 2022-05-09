const express = require('express');
const AccountRouter = require('./account.route');
const ProductRouter = require('./product.route');
const CompanyRouter = require('./company.route');
const AboutRouter = require('./about.route');
const BlogRouter = require('./blog.route');
const AddressRouter = require('./address.route');
const OrderRouter = require('./order.route');
const CartRouter = require('./cart.route');
const RateRouter = require('./rate.route');
// const TypeRouter = require('./type.route');
const VoucherRouter = require('./voucher.route');

const router = express.Router();
// router.use('/type', TypeRouter);
router.use('/voucher', VoucherRouter);
router.use('/blog', BlogRouter);
router.use('/address', AddressRouter);
router.use('/about', AboutRouter);
router.use('/company', CompanyRouter);
router.use('/product', ProductRouter);
router.use('/account', AccountRouter);
router.use('/cart', CartRouter);
router.use('/order', OrderRouter);
router.use('/rate', RateRouter);
router.get('/', (req, res) => res.status(200).send('Welcome to SHOP'));

module.exports = router;
