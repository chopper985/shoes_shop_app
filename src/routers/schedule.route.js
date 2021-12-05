const express = require('express');
const Controller = require('../controllers/schedule.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');

router.post('/change-status', verifyToken, admin, Controller.changeStatus);
router.get('/countMonth', verifyToken, Controller.CountUserSchedule);
router.get('/count', verifyToken, Controller.CountUserSchedule);
router.get('/user', verifyToken, Controller.getUserSchedule);
router.get('/', verifyToken, Controller.getSchedule);
router.delete('/', verifyToken, admin, Controller.deleteSchedule);
router.get('/all', verifyToken, admin, Controller.getAllSchedule);
router.post('/create', verifyToken, Controller.createSchedule);

module.exports = router;
