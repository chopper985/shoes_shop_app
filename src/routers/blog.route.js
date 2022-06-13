const express = require('express');
const Controller = require('../controllers/blog.controller');
const router = express.Router();
const verifyToken = require('../validators/verify');
const admin = require('../validators/admin');
const cpUpload = require('../validators/uploadImage');

router.get('/getDifferentBlogs', Controller.getDifferentBlogs);
router.put('/update', cpUpload, verifyToken, admin, Controller.updateBlog);
router.get('/', Controller.getBlog);
router.put('/delete', verifyToken, admin, Controller.deleteBlog);
router.post('/all', Controller.getAllBlog);
router.post('/create', cpUpload, verifyToken, admin, Controller.createBlog);

module.exports = router;
