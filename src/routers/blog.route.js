const express = require('express');
const Controller = require('../controllers/blog.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');

router.put('/update', verifyToken, admin, Controller.updateBlog);
router.get('/', Controller.getBlog);
router.put('/delete', verifyToken, admin, Controller.deleteBlog);
router.get('/all', Controller.getAllBlog);
router.post('/create', verifyToken, admin, Controller.createBlog);

module.exports = router;
