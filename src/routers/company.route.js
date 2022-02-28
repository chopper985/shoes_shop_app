const express = require('express');
const Controller = require('../controllers/company.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');

router.post('/update', verifyToken, admin, Controller.updateCompany);
router.get('/', Controller.getCompany);
router.post('/delete', verifyToken, admin, Controller.deleteCompany);
router.get('/all', Controller.getAllCompany);
router.post('/create', verifyToken, admin, Controller.createCompany);

module.exports = router;
