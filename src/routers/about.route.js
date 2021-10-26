const express = require('express');
const Controller = require('../controllers/about.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');

router.post('/contact', Controller.contact);
router.post('/update', verifyToken, admin, Controller.updateAbout);
router.post('/create', verifyToken, admin, Controller.createAbout);
router.get('/', Controller.getAbout);

module.exports = router;
