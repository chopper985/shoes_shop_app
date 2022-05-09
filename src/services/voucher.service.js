const voucherModel = require('../models/voucher.model');
const BaseService = require('../services/baseService');

class VoucherService extends BaseService {
    constructor() {
        super(voucherModel);
    }
    async createVoucher(payload) {
        try {
            const result = await this.create(payload);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getAllVoucher(filter = {}) {
        try {
            const result = await this.search(filter);
            console.log(result);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getVoucher(filter = {}) {
        try {
            const result = await this.findOne(filter);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getVoucherByVoucherCode(filter = {}) {
        try {
            const result = await this.findOne(filter);
            return result;
        } catch (e) {
            return null;
        }
    }
    async updateVoucher(id, item) {
        try {
            const result = await this.findByIdAndUpdate(id, item);
            return result;
        } catch (e) {
            return null;
        }
    }
    async deleteVoucher(id) {
        try {
            const result = await this.findByIdAndRemove(id);
            return result;
        } catch (e) {
            return null;
        }
    }
}
module.exports = new VoucherService();
