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
    async getProductByCompany(filter = {}, skip, limit) {
        try {
            const result = await this.getLimitSkip(filter, limit, skip);
            console.log(result);
            return result;
        } catch (e) {
            return null;
        }
    }
    async countProductByCompany(filter = {}) {
        try {
            const result = await this.countFilter(filter);
            console.log(result);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getProduct(filter = {}) {
        try {
            const result = await this.findOne(filter);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getProductByName(filter = {}, limit, skip) {
        try {
            const result = await this.getLimitSkip(filter, limit, skip);
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
    async getNewProduct() {
        try {
            const result = await this.getNew(
                { isDeleted: false },
                { updatedAt: -1 },
            );
            return result;
        } catch (e) {
            return null;
        }
    }
    async getProductTrending() {
        try {
            const result = await this.getNew(
                { isDeleted: false },
                { quantitySold: -1 },
            );
            return result;
        } catch (e) {
            return null;
        }
    }
    async getDiscountProduct() {
        try {
            const result = await this.getNew(
                { isDeleted: false, discount: { $gt: 0 } },
                { discount: -1 },
            );
            return result;
        } catch (e) {
            return null;
        }
    }
}
module.exports = new ProductService();
