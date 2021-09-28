const express = require('express');
const Controller = require('../controllers/branch.controller');
const router = express.Router();

router.post('/create', Controller.createBranch);
module.exports = router;
