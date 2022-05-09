const ProductService = require('../services/product.service');
const BaseController = require('./baseController');

class ProductController {
    constructor() {}
    //[POST] /api/product/create
    async createProduct(req, res) {
        try {
            const result = await ProductService.create(req.body);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Create Product Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                200,
                'Create Product Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/product/getAllProduct
    async getAllProduct(req, res) {
        try {
            ProductService.getAllProduct({ isDeleted: false }).then(
                (product) => {
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
                        200,
                        'Get All Success!',
                    );
                },
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/product/getProduct/{getId}
    async getProduct(req, res) {
        try {
            const result = await ProductService.getProduct({
                _id: req.query.getId,
                isDeleted: false,
            });
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Product Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                200,
                'Get Product Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[POST] /api/product/update
    async updateProduct(req, res) {
        try {
            const product = await ProductService.updateProduct(
                req.body._id,
                req.body,
            );
            if (product === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Update  Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                product,
                200,
                'Update Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[DELETE] /api/product/delete/:id
    async deleteProduct(req, res) {
        try {
            const result = await ProductService.findById(req.query.getId);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Product Failed!',
                );
            }
            result.isDeleted = true;
            result.save();
            return BaseController.sendSuccess(
                res,
                result,
                200,
                'Get Product Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[Get] /api/product/getNewProduct
    async getNewProduct(req, res) {
        try {
            const result = await ProductService.getNewProduct();
            console.log(result);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Product Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                200,
                'Get Product Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    // [Get] /api/product/getProductTrending
    async getProductTrending(req, res) {
        try {
            const result = await ProductService.getProductTrending();
            console.log(result);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Product Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                200,
                'Get Product Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }

    //[Get] /api/product/getDiscountProduct
    async getDiscountProduct(req, res) {
        try {
            const result = await ProductService.getDiscountProduct();
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Product Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                200,
                'Get Product Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
}

module.exports = new ProductController();
