const BlogService = require('../services/blog.service');
const BaseController = require('./baseController');

class BlogController {
    constructor() {}
    //[POST] /api/blog/create
    async createBlog(req, res) {
        try {
            console.log(req.files['Image'][0].filename);
            console.log(req.body.nameCompany);
            var image = await BaseController.UploadImage(
                req.files['Image'][0].filename,
                'Product/',
            );
            console.log(image);
            if (image === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Upload Image Failed!',
                );
            }
            const result = await BlogService.create(req.body);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Create Blog Failed!',
                );
            }
            result.imageBlog = image;
            result.save();
            return BaseController.sendSuccess(
                res,
                result,
                200,
                'Create Blog Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/blog/getAllBlog
    async getAllBlog(req, res) {
        try {
            await BlogService.getAllBlog(
                { isDeleted: false },
                req.body.limit,
                req.body.skip,
            ).then((voucher) => {
                if (voucher === null) {
                    return BaseController.sendSuccess(
                        res,
                        null,
                        300,
                        'Get All Failed!',
                    );
                }
                return BaseController.sendSuccess(
                    res,
                    voucher,
                    200,
                    'Get All Success!',
                );
            });
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/blog/getBlog/{getId}
    async getBlog(req, res) {
        try {
            console.log(req.query.getId);
            const result = await BlogService.getBlog({
                _id: req.query.getId,
                isDeleted: false,
            });
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Blog Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                200,
                'Get Blog Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[POST] /api/blog/update
    async updateBlog(req, res) {
        try {
            const blog = await BlogService.updateBlog(req.body._id, req.body);
            if (blog === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Update  Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                blog,
                200,
                'Update Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[DELETE] /api/blog/delete/:id
    async deleteBlog(req, res) {
        try {
            const result = await BlogService.findById(req.query.getId);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Blog Failed!',
                );
            }
            result.isDeleted = true;
            result.save();
            return BaseController.sendSuccess(
                res,
                result,
                200,
                'Get Blog Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[Get] /api/blog/getDifferentBlogs
    async getDifferentBlogs(req, res) {
        try {
            const result = await BlogService.getDifferentBlogs(req.query.getId);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Blogs Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                200,
                'Get Blogs Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
}

module.exports = new BlogController();
