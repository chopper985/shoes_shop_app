const rateModel = require('../models/rate.model');
const BaseService = require('../services/baseService');

class RateService extends BaseService {
    constructor() {
        super(rateModel);
    }
    async createRate(payload) {
        try {
            const result = await this.create(payload);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getAllRate(filter = {}) {
        try {
            const result = await this.find(filter);
            console.log(result);
            return result;
        } catch (e) {
            return null;
        }
    }
    getRateNumberByIdProduct = async function (id) {
        try {
            var rateNumber = 0;
            const result = await this.search({
                isDeleted: false,
                idProduct: id,
            });
            if (result === null) {
                return 0;
            }
            console.log(result);
            result.forEach((element) => {
                rateNumber += element.rating;
            });
            rateNumber = rateNumber / result.length;
            console.log(rateNumber);
            return rateNumber;
        } catch (e) {
            console.log(e);
            return 0;
        }
    };
    async getOneRateByAccount(filter = {}) {
        try {
            const result = await this.findOne(filter);
            console.log(result);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getRate(id) {
        try {
            const result = await this.findById(id);
            return result;
        } catch (e) {
            return null;
        }
    }
    async updateRate(id, item) {
        try {
            const result = await this.findByIdAndUpdate(id, item);
            return result;
        } catch (e) {
            return null;
        }
    }
    async deleteRate(id) {
        try {
            const result = await this.findByIdAndRemove(id);
            return result;
        } catch (e) {
            return null;
        }
    }
}
module.exports = new RateService();
