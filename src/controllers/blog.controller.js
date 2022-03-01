const BlogService = require('../services/blog.service');
const BaseController = require('./baseController');

class BlogController {
    constructor() {}
    //[POST] /api/blog/create
    async createBlog(req, res) {
        try {
            const result = await BlogService.create(req.body);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Create Blog Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                201,
                'Create Blog Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/blog/getAllBlog
    async getAllBlog(req, res) {
        try {
            BlogService.getAllBlog({ isDeleted: false }).then((product) => {
                if (product === null) {
                    return BaseController.sendSuccess(
                        res,
                        null,
                        300,
                        'Get All Failed!',
                    );
                }
                return BaseController.sendSuccess(
                    res,
                    product,
                    201,
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
                201,
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
                201,
                'Update Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[DELETE] /api/blog/delete/:id
    async deleteBlog(req, res) {
        try {
            const result = await BlogService.getBlog(req.query.getId);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Blog Failed!',
                );
            }
            result.isDelete = true;
            result.save();
            return BaseController.sendSuccess(
                res,
                result,
                201,
                'Get Blog Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
}

module.exports = new BlogController();
