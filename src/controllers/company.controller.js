const CompanyService = require('../services/company.service');
const BaseController = require('./baseController');

class CompanyController {
    constructor() {}
    //[POST] /api/company/create
    async createCompany(req, res) {
        try {
            const result = await CompanyService.create(req.body);
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
                201,
                'Create Company Success!',
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
                        201,
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
                201,
                'Get Company Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[POST] /api/company/update
    async updateCompany(req, res) {
        try {
            const company = await CompanyService.updateCompany(
                req.body._id,
                req.body,
            );
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
                201,
                'Update Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[DELETE] /api/company/delete/:id
    async deleteCompany(req, res) {
        try {
            const result = await CompanyService.getCompany(req.query.getId);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Company Failed!',
                );
            }
            result.isDelete = true;
            result.save();
            return BaseController.sendSuccess(
                res,
                result,
                201,
                'Get Company Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
}

module.exports = new CompanyController();
