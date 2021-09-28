const express = require('express');
const Controller = require('../controllers/carCompany.controller');
const router = express.Router();

router.post('/create', Controller.createCarCompany);
module.exports = router;
