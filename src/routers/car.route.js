const express = require('express');
const Controller = require('../controllers/car.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');

router.get('/car_name', Controller.searchCarName);
router.get('/all', Controller.getAllCar);
router.get('/company', Controller.searchCompanyCar);
router.get('/', Controller.getCar);
router.delete('/', verifyToken, admin, Controller.deleteCar);
router.post('/create', verifyToken, admin, Controller.createCar);
router.post('/', verifyToken, admin, Controller.updateCar);

module.exports = router;
