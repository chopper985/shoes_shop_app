const productModel = require('../models/product.model');
const BaseService = require('../services/baseService');

class ProductService extends BaseService {
    constructor() {
        super(productModel);
    }
    async createProduct(payload) {
        try {
            const result = await this.create(payload);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getAllProduct(filter = {}) {
        try {
            const result = await this.search(filter);
            console.log(result);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getProduct(filter = {}) {
        try {
            const result = await this.search(filter);
            return result;
        } catch (e) {
            return null;
        }
    }
    async updateProduct(id, item) {
        try {
            const result = await this.findByIdAndUpdate(id, item);
            return result;
        } catch (e) {
            return null;
        }
    }
    async deleteProduct(id) {
        try {
            const result = await this.findByIdAndRemove(id);
            return result;
        } catch (e) {
            return null;
        }
    }
}
module.exports = new ProductService();
