const express = require('express');
const Controller = require('../controllers/about.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');
const cpUpload = require('../validators/uploadImage');

router.put('/update', cpUpload, verifyToken, admin, Controller.updateAbout);
router.get('/', Controller.getAbout);
router.post('/create', cpUpload, verifyToken, admin, Controller.createAbout);

module.exports = router;
