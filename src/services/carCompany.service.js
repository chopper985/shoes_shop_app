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
    async getAllCompany() {
        try {
            const result = await this.findAll();
            console.log(result);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getCompany(id) {
        try {
            const result = await this.findById(id);
            return result;
        } catch (e) {
            return null;
        }
    }
    async deleteCompany(id) {
        try {
            const result = await this.findByIdAndRemove(id);
            return result;
        } catch (e) {
            return null;
        }
    }
}
module.exports = new CarCompanyService();
