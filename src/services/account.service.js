const accountModel = require('../models/account.model');
const BaseService = require('./baseService');
const bcrypt = require('bcrypt');

class AccountService extends BaseService {
    constructor() {
        super(accountModel);
    }
    async createAccount(payload) {
        try {
            const result = await this.create(payload);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getAllAccount() {
        try {
            const result = await this.findAll();
            console.log(result);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getAccount(id) {
        try {
            const result = await this.findById(id);
            return result;
        } catch (e) {
            return null;
        }
    }
    async login(payload) {
        try {
            const result = await this.findOne({
                phoneNumber: payload.phoneNumber,
            });
            console.log(result);
            if (result) {
                const validPassword = await bcrypt.compare(
                    payload.password,
                    result.password,
                );
                if (validPassword) {
                    return result;
                } else {
                    return null;
                }
            }
            return null;
        } catch (e) {
            return null;
        }
    }
    async updateAccount(id, item) {
        try {
            const result = await this.findByIdAndUpdate(id, item);
            return result;
        } catch (e) {
            return null;
        }
    }
    async reserPassword(filter = {}) {
        try {
            const result = await this.findOne(filter);
            return result;
        } catch (e) {
            return null;
        }
    }
}
module.exports = new AccountService();
