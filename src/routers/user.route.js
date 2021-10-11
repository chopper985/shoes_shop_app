const express = require('express');
const Controller = require('../controllers/user.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');

router.get('/user', verifyToken, Controller.getUser);
router.get('/all', verifyToken, admin, Controller.getAllUser);
router.post('/login', Controller.login);
router.post('/register', Controller.createUser);
router.post('/', Controller.updateUser);
module.exports = router;
