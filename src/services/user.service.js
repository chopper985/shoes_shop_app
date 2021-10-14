const userModel = require('../models/user.model');
const BaseService = require('../services/baseService');
const bcrypt = require('bcrypt');

class UserService extends BaseService {
    constructor() {
        super(userModel);
    }
    async createUser(payload) {
        try {
            const result = await this.create(payload);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getAllUser() {
        try {
            const result = await this.findAll();
            console.log(result);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getUser(id) {
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
                userName: payload.userName,
            });
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
    async updateUser(id, item) {
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
module.exports = new UserService();
