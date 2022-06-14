const CompanyService = require('../services/company.service');
const BaseController = require('./baseController');

class CompanyController {
    constructor() {}
    //[POST] /api/company/getImages
    async getImage(req, res) {
        try {
            console.log(req.files['Image'][0].filename);
            console.log(req.body.nameCompany);
            var image = await BaseController.UploadImage(
                req.files['Image'][0].filename,
                'Image/',
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

            return BaseController.sendSuccess(
                res,
                image,
                200,
                'Create Company Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[POST] /api/company/create
    async createCompany(req, res) {
        try {
            // console.log(req.files['Image'][0].filename);
            // console.log(req.body.nameCompany);
            // var image = await BaseController.UploadImage(
            //     req.files['Image'][0].filename,
            //     'Company/',
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
            const result = await CompanyService.create({
                nameCompany: req.body.nameCompany,
                logoCompany: req.body.logoCompany,
            });
            // result.logoCompany = image;
            // result.save();
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Create Company Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                200,
                'Create Company Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/company/getAllCompanyByAdmin
    async getAllCompanyByAdmin(req, res) {
        try {
            CompanyService.getAllCompany({ isDeleted: false }).then(
                (company) => {
                    if (company === null) {
                        return BaseController.sendSuccessTotal(
                            res,
                            null,
                            0,
                            300,
                            'Get All Failed!',
                        );
                    }
                    return BaseController.sendSuccessTotal(
                        res,
                        company,
                        company.length,
                        200,
                        'Get All Success!',
                    );
                },
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/company/getAllCompany
    async getAllCompany(req, res) {
        try {
            CompanyService.getAllCompany({ isDeleted: false }).then(
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
    //[GET] /api/company/getCompany/{getId}
    async getCompany(req, res) {
        try {
            const result = await CompanyService.getCompany({
                _id: req.query.getId,
                isDeleted: false,
            });
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Company Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                200,
                'Get Company Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[POST] /api/company/update
    async updateCompany(req, res) {
        try {
            // var image = await BaseController.UploadImage(
            //     req.files['Image'][0].filename,
            //     'Company/',
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
            const company = await CompanyService.updateCompany(
                req.body._id,
                req.body,
            );
            // company.logoCompany = image;
            // company.save();
            if (company === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Update  Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                company,
                200,
                'Update Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[DELETE] /api/company/delete/:id
    async deleteCompany(req, res) {
        try {
            const result = await CompanyService.findById(req.query.getId);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Company Failed!',
                );
            }
            result.isDeleted = true;
            result.save();
            return BaseController.sendSuccess(
                res,
                result,
                200,
                'Get Company Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
}

module.exports = new CompanyController();
