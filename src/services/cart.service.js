const cartModel = require('../models/cart.model');
const BaseService = require('../services/baseService');

class CartService extends BaseService {
    constructor() {
        super(cartModel);
    }
    async createCart(payload) {
        try {
            const result = await this.create(payload);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getAllCart(filter = {}) {
        try {
            const result = await this.search(filter);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getCart(filter = {}) {
        try {
            const result = await this.findOne(filter);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getCartById(id) {
        try {
            const result = await this.findById(id);
            return result;
        } catch (e) {
            return null;
        }
    }
    async updateCart(id, item) {
        try {
            const result = await this.findByIdAndUpdate(id, item);
            return result;
        } catch (e) {
            return null;
        }
    }
    async deleteCart(id) {
        try {
            const result = await this.findByIdAndRemove(id);
            return result;
        } catch (e) {
            return null;
        }
    }
}
module.exports = new CartService();
