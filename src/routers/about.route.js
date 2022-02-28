const express = require('express');
const Controller = require('../controllers/about.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');

router.post('/update', verifyToken, admin, Controller.updateAbout);
router.get('/', Controller.getAbout);
router.post('/create', verifyToken, admin, Controller.createAbout);

module.exports = router;
