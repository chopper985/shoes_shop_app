const express = require('express');
const Controller = require('../controllers/user.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');

router.get('/user', verifyToken, Controller.getUser);
router.get('/all', verifyToken, admin, Controller.getAllUser);
router.post('/reset_password', Controller.resetPassword);
router.put('/change_password', Controller.changePassword);
router.post('/login', Controller.login);
router.post('/register', Controller.createUser);
router.put('/user', verifyToken, Controller.updateUser);
module.exports = router;
