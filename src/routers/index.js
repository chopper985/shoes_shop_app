const express = require('express');
const UserRouter = require('./user.route');
const CarRouter = require('./car.route');
const CarCompanyRouter = require('./carCompany.route');
const BranchcRouter = require('./branch.route');

const router = express.Router();

router.use('/branch', BranchcRouter);
router.use('/car-company', CarCompanyRouter);
router.use('/car', CarRouter);
router.use('/user', UserRouter);
router.get('/', (req, res) => res.status(200).send('Welcome to SHOP'));

module.exports = router;
