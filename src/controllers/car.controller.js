const CarService = require('../services/car.service');
const BaseController = require('./baseController');

class CarController {
    constructor() {}
    //[POST] /api/createCar/create
    async createCar(req, res) {
        try {
            console.log(req.value.body.decodeToken);
            const result = await CarService.create(req.body);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Create Car Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                201,
                'Create Car Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/car/all
    async getAllCar(req, res) {
        try {
            CarService.getAllCar().then((car) => {
                if (car === null) {
                    return BaseController.sendSuccess(
                        res,
                        null,
                        300,
                        'Get All Failed!',
                    );
                }
                return BaseController.sendSuccess(
                    res,
                    car,
                    201,
                    'Get All Success!',
                );
            });
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/car/:id
    async getCar(req, res) {
        try {
            const car = await CarService.getCar(req.query.getId);
            if (car === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Car Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                car,
                201,
                'Get Car Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[DELETE] /api/car/:id
    async deleteCar(req, res) {
        try {
            console.log(req.query.deleteId);
            const car = await CarService.deleteCar(req.query.deleteId);

            if (car === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get  Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                car,
                201,
                'Get Car Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
}

module.exports = new CarController();
