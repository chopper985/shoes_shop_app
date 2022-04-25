const express = require('express');
const Controller = require('../controllers/account.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');

// router.put('/change_passwordId',verifyToken,Controller.changePasswordId);
router.get('/getFavoriteAccount', verifyToken, Controller.getFavoriteAccount);
router.post('/submitFavorite', verifyToken, Controller.submitFavorite);
router.get('/getAccount', verifyToken, Controller.getAccount);
router.get('/all', verifyToken, admin, Controller.getAllAccount);
router.post('/sendOtp', Controller.sendOTP);
router.post('/submitOTP', Controller.submitOTP);
router.put('/reset_password', Controller.resetPassword);
router.put('/change_password', verifyToken, Controller.changePassword);
router.post('/login', Controller.login);
router.post('/register', Controller.createUser);
router.put('/update', verifyToken, Controller.updateAccount);
module.exports = router;
