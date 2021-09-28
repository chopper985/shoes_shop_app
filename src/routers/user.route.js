const express = require('express');
const Controller = require('../controllers/user.controller');
const router = express.Router();

router.post('/login', Controller.login);
router.post('/register', Controller.createUser);
module.exports = router;
