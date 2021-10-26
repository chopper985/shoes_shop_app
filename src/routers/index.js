const express = require('express');
const UserRouter = require('./user.route');
const CarRouter = require('./car.route');
const CarCompanyRouter = require('./carCompany.route');
const AboutRouter = require('./about.route');
const ScheDuleRouter = require('./schedule.route');

const router = express.Router();

router.use('/schedule', ScheDuleRouter);
router.use('/schedule', ScheDuleRouter);
router.use('/about', AboutRouter);
router.use('/company', CarCompanyRouter);
router.use('/car', CarRouter);
router.use('/user', UserRouter);
router.get('/', (req, res) => res.status(200).send('Welcome to SHOP'));

module.exports = router;
