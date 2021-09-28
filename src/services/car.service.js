const carModel = require('../models/car.model');
const BaseService = require('../services/baseService');

class CarService extends BaseService {
    constructor() {
        super(carModel);
    }
    async createCar(payload) {
        try {
            const result = await this.create(payload);
            return result;
        } catch (e) {
            return null;
        }
    }
}
module.exports = new CarService();
