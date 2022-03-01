const addressModel = require('../models/address.model');
const BaseService = require('../services/baseService');

class AddressService extends BaseService {
    constructor() {
        super(addressModel);
    }
    async createAddress(payload) {
        try {
            const result = await this.create(payload);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getAllAddress(filter = {}) {
        try {
            const result = await this.search(filter);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getAddress(id) {
        try {
            const result = await this.findById(id);
            return result;
        } catch (e) {
            return null;
        }
    }
    async updateAddress(id, item) {
        try {
            const result = await this.findByIdAndUpdate(id, item);
            return result;
        } catch (e) {
            return null;
        }
    }
    async deleteAddress(id) {
        try {
            const result = await this.findByIdAndRemove(id);
            return result;
        } catch (e) {
            return null;
        }
    }
}
module.exports = new AddressService();
