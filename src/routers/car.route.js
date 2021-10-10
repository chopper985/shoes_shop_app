const express = require('express');
const Controller = require('../controllers/car.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');
const { route } = require('.');

router.get('/', Controller.getCar);
router.delete('/', verifyToken, admin, Controller.deleteCar);
router.get('/all', Controller.getAllCar);
router.post('/create', verifyToken, admin, Controller.createCar);

module.exports = router;
