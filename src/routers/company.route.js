const express = require('express');
const Controller = require('../controllers/company.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname),
        );
    },
});
const upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: 'Image', maxCount: 100 }]);

router.put('/update', verifyToken, admin, Controller.updateCompany);
router.get('/', Controller.getCompany);
router.put('/delete', verifyToken, admin, Controller.deleteCompany);
router.get('/all', Controller.getAllCompany);
router.post('/create', cpUpload, verifyToken, admin, Controller.createCompany);

module.exports = router;
