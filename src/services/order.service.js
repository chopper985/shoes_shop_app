const {
    ConversationList,
} = require('twilio/lib/rest/conversations/v1/service/conversation');
const orderModel = require('../models/order.model');
const BaseService = require('../services/baseService');
const ProductService = require('../services/product.service');

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
            const result = await this.findOne(filter);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getOrderById(id) {
        try {
            const result = await this.findById(id);
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
    async checkQuanlity(lstCart) {
        try {
            for (var i = 0; i < lstCart.length; i++) {
                const product = await ProductService.findOne({
                    _id: lstCart[i].lstProduct._id,
                    isDeleted: false,
                });
                if (product === null) {
                    return BaseController.sendSuccess(
                        res,
                        null,
                        404,
                        'Not Found Product!',
                    );
                }
                var index = 0;
                index = product.type.findIndex(
                    (t) =>
                        t.size === lstCart[i].lstProduct.type.size &&
                        t.color === lstCart[i].lstProduct.type.color,
                );
                if (index !== -1) {
                    if (lstCart[i].amount <= product.type[index].quantity) {
                        return index;
                    }
                }
            }
            return -1;
        } catch (e) {
            console.log(e);
            return -1;
        }
    }
}
module.exports = new OrderService();
