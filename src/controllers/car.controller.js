const CarService = require('../services/car.service');
const BaseController = require('./baseController');

class CarController {
    constructor() {}
    async createCar(req, res) {
        try {
            const result = await CarService.create(req.body);
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

module.exports = new CarController();
