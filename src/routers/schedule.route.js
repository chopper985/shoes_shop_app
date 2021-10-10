const express = require('express');
const Controller = require('../controllers/schedule.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');

router.get('/', Controller.getSchedule);
router.delete('/', verifyToken, admin, Controller.deleteSchedule);
router.get('/all', Controller.getAllSchedule);
router.post('/create', Controller.createSchedule);

module.exports = router;
