const scheduleModel = require('../models/schedule.model');
const BaseService = require('../services/baseService');

class ScheduleService extends BaseService {
    constructor() {
        super(scheduleModel);
    }
    async createSchedule(payload) {
        try {
            const result = await this.create(payload);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getAllSchedule() {
        try {
            const result = await this.findAll();
            console.log(result);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getSchedule(id) {
        try {
            const result = await this.findById(id);
            return result;
        } catch (e) {
            return null;
        }
    }
    async deleteSchedule(id) {
        try {
            const result = await this.findByIdAndRemove(id);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getUserSchedule(filter = {}) {
        try {
            const result = await this.find((filter = {}));
            return result;
        } catch (e) {
            return null;
        }
    }
}
module.exports = new ScheduleService();
