const orderModel = require('../models/order.model');
const BaseService = require('../services/baseService');

class OrderService extends BaseService {
    constructor() {
        super(orderModel);
    }
    async createOrder(payload) {
        try {
            const result = await this.create(payload);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getAllOrder(filter = {}) {
        try {
            const result = await this.search(filter);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getOrder(filter = {}) {
        try {
            const result = await this.search(filter);
            return result;
        } catch (e) {
            return null;
        }
    }
    async updateOrder(id, item) {
        try {
            const result = await this.findByIdAndUpdate(id, item);
            return result;
        } catch (e) {
            return null;
        }
    }
    async deleteOrder(id) {
        try {
            const result = await this.findByIdAndRemove(id);
            return result;
        } catch (e) {
            return null;
        }
    }
}
module.exports = new OrderService();
