const express = require('express');
const Controller = require('../controllers/product.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');

router.post('/getProductbyName', Controller.getProductByName);
router.get('/getProductbyCompany/', Controller.getProductByCompany);
router.get('/getNewProduct', Controller.getNewProduct);
router.get('/getDiscountProduct', Controller.getDiscountProduct);
router.get('/getProductTrending', Controller.getProductTrending);
router.put('/update', verifyToken, admin, Controller.updateProduct);
router.get('/', Controller.getProduct);
router.put('/delete', verifyToken, admin, Controller.deleteProduct);
router.get('/all', Controller.getAllProduct);
router.post('/create', verifyToken, admin, Controller.createProduct);

module.exports = router;
