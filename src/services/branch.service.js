const branchModel = require('../models/branch.model');
const BaseService = require('../services/baseService');

class BranchService extends BaseService {
    constructor() {
        super(branchModel);
    }
    async createBranch(payload) {
        try {
            const result = await this.create(payload);
            return result;
        } catch (e) {
            return null;
        }
    }
}
module.exports = new BranchService();
