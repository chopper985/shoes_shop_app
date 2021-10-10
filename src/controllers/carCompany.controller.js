const CarCompanyService = require('../services/carCompany.service');
const BaseController = require('./baseController');

class CarCompanyController {
    constructor() {}
    //[POST] /api/company/create
    async createCarCompany(req, res) {
        try {
            const result = await CarCompanyService.create(req.body);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Create User Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                201,
                'Create User Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/company/all
    async getAllCompany(req, res) {
        try {
            CarCompanyService.getAllCompany().then((company) => {
                if (company === null) {
                    return BaseController.sendSuccess(
                        res,
                        null,
                        300,
                        'Get All Failed!',
                    );
                }
                return BaseController.sendSuccess(
                    res,
                    company,
                    201,
                    'Get All Success!',
                );
            });
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/company/:id
    async getCompany(req, res) {
        try {
            const company = await CarCompanyService.getCompany(req.query.getId);
            console.log(req.params.companyId);
            if (company === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Company Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                company,
                201,
                'Get Company Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[DELETE] /api/car/:id
    async deleteCompany(req, res) {
        try {
            const company = await CarCompanyService.deleteCompany(
                req.query.deleteId,
            );
            if (company === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Delete Company Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                company,
                201,
                'Delete Company Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
}

module.exports = new CarCompanyController();
