const companyModel = require('../models/company.model');
const BaseService = require('../services/baseService');

class CompanyService extends BaseService {
    constructor() {
        super(companyModel);
    }
    async createCompany(payload) {
        try {
            const result = await this.create(payload);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getAllCompany(filter = {}) {
        try {
            const result = await this.search(filter);
            console.log(result);
            return result;
        } catch (e) {
            return null;
        }
    }
    async countCompany() {
        try {
            const result = await this.count();
            return result;
        } catch (e) {
            return null;
        }
    }
    async getCompany(filter = {}) {
        try {
            const result = await this.findOne(filter);
            return result;
        } catch (e) {
            return null;
        }
    }
    async updateCompany(id, item) {
        try {
            const result = await this.findByIdAndUpdate(id, item);
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
module.exports = new CompanyService();
