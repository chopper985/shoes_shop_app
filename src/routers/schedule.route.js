const express = require('express');
const Controller = require('../controllers/schedule.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');

router.get('/', verifyToken, Controller.getSchedule);
router.delete('/', verifyToken, admin, Controller.deleteSchedule);
router.get('/all', verifyToken, admin, Controller.getAllSchedule);
router.post('/create', verifyToken, Controller.createSchedule);

module.exports = router;
