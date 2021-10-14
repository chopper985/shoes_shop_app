const aboutModel = require('../models/about.model');
const BaseService = require('../services/baseService');

class AboutService extends BaseService {
    constructor() {
        super(aboutModel);
    }
    async createAbout(payload) {
        try {
            const result = await this.create(payload);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getAbout(id) {
        try {
            const result = await this.findById(id);
            return result;
        } catch (e) {
            return null;
        }
    }
    async updateAbout(id, item) {
        try {
            const result = await this.findByIdAndUpdate(id, item);
            return result;
        } catch (e) {
            return null;
        }
    }
}
module.exports = new AboutService();
