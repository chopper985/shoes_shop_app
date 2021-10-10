const express = require('express');
const Controller = require('../controllers/carCompany.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');

router.get('/', Controller.getCompany);
router.delete('/', verifyToken, admin, Controller.deleteCompany);
router.get('/all', Controller.getAllCompany);
router.post('/create', verifyToken, admin, Controller.createCarCompany);

module.exports = router;
