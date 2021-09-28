const CarCompanyService = require('../services/carCompany.service');
const BaseController = require('./baseController');

class CarCompanyController {
    constructor() {}
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
}

module.exports = new CarCompanyController();
