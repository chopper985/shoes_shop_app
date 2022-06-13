const ProductService = require('../services/product.service');
const CompanyService = require('../services/company.service');
const BaseController = require('./baseController');

class ProductController {
    constructor() {}
    //[POST] /api/product/create
    async createProduct(req, res) {
        try {
            // console.log(req.files['Image'][0].filename);
            // console.log(req.body.nameCompany);
            // var image = await BaseController.UploadImage(
            //     req.files['Image'][0].filename,
            //     'Product/',
            // );
            // console.log(image);
            // if (image === null) {
            //     return BaseController.sendSuccess(
            //         res,
            //         null,
            //         300,
            //         'Upload Image Failed!',
            //     );
            // }
            const result = await ProductService.create(req.body);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Create Product Failed!',
                );
            }
            // result.imageProduct[0] = image;
            // result.save();
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
    //[GET] /api/product/getProductByCompany/{getId}
    async getProductByCompany(req, res) {
        try {
            const result = await ProductService.getProductByCompany(
                {
                    idCompany: req.body.idCompany,
                    isDeleted: false,
                },
                req.body.skip,
                req.body.limit,
            );
            const totalProduct = await ProductService.countProductByCompany({
                idCompany: req.body.idCompany,
                isDeleted: false,
            });
            if (result === null) {
                return BaseController.sendSuccessProduct(
                    res,
                    null,
                    0,
                    300,
                    'Get Product Failed!',
                );
            }
            return BaseController.sendSuccessProduct(
                res,
                result,
                totalProduct,
                200,
                'Get Product Success!',
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
    //[GET] /api/product/getProductByName
    async getProductByName(req, res) {
        try {
            console.log(req.body.nameProductVi);
            const result = await ProductService.getProductByName(
                {
                    nameProductVi: {
                        $regex: req.body.nameProductVi,
                        $options: 'i',
                    },
                    isDeleted: false,
                },
                req.body.limit,
                req.body.skip,
            );
            console.log(result);
            const totalProduct = await ProductService.countProductByCompany({
                nameProductVi: {
                    $regex: req.body.nameProductVi,
                    $options: 'i',
                },
                isDeleted: false,
            });
            if (result === null) {
                return BaseController.sendSuccessProduct(
                    res,
                    null,
                    0,

                    300,
                    'Get Product Failed!',
                );
            }
            return BaseController.sendSuccessProduct(
                res,
                result,
                totalProduct,
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
            // console.log(result);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Product Failed!',
                );
            }
            var rs = new Array();
            for (var i = 0; i < result.length; i++) {
                const company = await CompanyService.findById(
                    result[i].idCompany,
                );
                rs.push(
                    Object({
                        product: result[i],
                        companyName: company.nameCompany,
                    }),
                );
            }
            return BaseController.sendSuccess(
                res,
                rs,
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

    //[POST] /api/product/search
    async searchProduct(req, res) {
        try {
            var result;
            var totalProduct;
            console.log(req.body.name);
            console.log(req.body.idCompant);
            if (
                req.body.nameProductVi === undefined &&
                req.body.idCompany !== undefined
            ) {
                result = await ProductService.getProductByCompany(
                    {
                        idCompany: req.body.idCompany,
                        isDeleted: false,
                    },
                    req.body.skip,
                    req.body.limit,
                );
                totalProduct = await ProductService.countProductByCompany({
                    idCompany: req.body.idCompany,
                    isDeleted: false,
                });
                if (result === null) {
                    return BaseController.sendSuccessProduct(
                        res,
                        null,
                        0,
                        404,
                        'Not Found Product!',
                    );
                }
            } else if (
                req.body.nameProductVi !== undefined &&
                req.body.idCompany === undefined
            ) {
                result = await ProductService.getProductByName(
                    {
                        nameProductVi: {
                            $regex: req.body.nameProductVi,
                            $options: 'i',
                        },
                        isDeleted: false,
                    },
                    req.body.limit,
                    req.body.skip,
                );
                console.log(result);
                totalProduct = await ProductService.countProductByCompany({
                    nameProductVi: {
                        $regex: req.body.nameProductVi,
                        $options: 'i',
                    },
                    isDeleted: false,
                });
                if (result === null) {
                    return BaseController.sendSuccessProduct(
                        res,
                        null,
                        0,
                        404,
                        'Not Found Product!',
                    );
                }
            } else if (
                req.body.nameProductVi !== undefined &&
                req.body.idCompany !== undefined
            ) {
                result = await ProductService.getProductByName(
                    {
                        idCompany: req.body.idCompany,
                        nameProductVi: {
                            $regex: req.body.nameProductVi,
                            $options: 'i',
                        },
                        isDeleted: false,
                    },
                    req.body.limit,
                    req.body.skip,
                );
                console.log(result + 'TTT');
                totalProduct = await ProductService.countProductByCompany({
                    idCompany: req.body.idCompany,
                    nameProductVi: {
                        $regex: req.body.nameProductVi,
                        $options: 'i',
                    },
                    isDeleted: false,
                });
                if (result === null) {
                    return BaseController.sendSuccessProduct(
                        res,
                        null,
                        0,
                        404,
                        'Not Found Product!',
                    );
                }
            }
            console.log(result);
            return BaseController.sendSuccessProduct(
                res,
                result,
                totalProduct,
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

    //[Get] /api/product/getRelatedProducts
    async getRelatedProducts(req, res) {
        try {
            const product = await ProductService.getProduct({
                _id: req.query.getId,
                isDeleted: false,
            });
            if (product === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Product Failed!',
                );
            }
            const result = await ProductService.getRelatedProducts(
                req.query.getId,
                product.idCompany,
            );
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
