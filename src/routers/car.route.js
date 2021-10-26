const express = require('express');
const Controller = require('../controllers/car.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');
// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads/");
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
//     },
// });
// const upload = multer({ storage: storage });
// var cpUpload = upload.fields([{ name: 'Image', maxCount: 100 }]);
router.get('/car_name', Controller.searchCarName);
router.get('/all', Controller.getAllCar);
router.get('/company', Controller.searchCompanyCar);
router.get('/', Controller.getCar);
router.delete('/', verifyToken, admin, Controller.deleteCar);
router.post('/create', verifyToken, admin, Controller.createCar);
router.post('/', verifyToken, admin, Controller.updateCar);

module.exports = router;
