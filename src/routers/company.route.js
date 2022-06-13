const express = require('express');
const Controller = require('../controllers/company.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');
const cpUpload = require('../validators/uploadImage');

router.put('/update', cpUpload, verifyToken, admin, Controller.updateCompany);
router.get('/', Controller.getCompany);
router.put('/delete', verifyToken, admin, Controller.deleteCompany);
router.get('/all', Controller.getAllCompany);
router.post('/create', cpUpload, verifyToken, admin, Controller.createCompany);

module.exports = router;
