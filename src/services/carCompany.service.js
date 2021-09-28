const carCompanyModel = require('../models/carCompany.model');
const BaseService = require('../services/baseService');

class CarCompanyService extends BaseService {
    constructor() {
        super(carCompanyModel);
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
module.exports = new CarCompanyService();
