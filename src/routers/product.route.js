const express = require('express');
const Controller = require('../controllers/product.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');

router.post('/update', verifyToken, admin, Controller.updateProduct);
router.get('/', Controller.getProduct);
router.post('/delete', verifyToken, admin, Controller.deleteProduct);
router.get('/all', Controller.getAllProduct);
router.post('/create', verifyToken, admin, Controller.createProduct);

module.exports = router;
