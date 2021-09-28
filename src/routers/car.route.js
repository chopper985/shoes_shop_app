const express = require('express');
const Controller = require('../controllers/car.controller');
const router = express.Router();

router.post('/create', Controller.createCar);
module.exports = router;
