const userModel = require('../models/user.model');
const BaseService = require('../services/baseService');

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
    async login(payload) {
        try {
            const result = await this.findOne({
                userName: payload.userName,
                password: payload.password,
            });
            if (result) {
                return result;
            }
            return null;
        } catch (e) {
            return null;
        }
    }
}
module.exports = new UserService();
