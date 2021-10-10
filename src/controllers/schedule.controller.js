const ScheduleService = require('../services/schedule.service');
const BaseController = require('./baseController');

class ScheduleController {
    constructor() {}
    //[POST] /api/createschedule/create
    async createSchedule(req, res) {
        try {
            const result = await ScheduleService.create(req.body);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Create Schedule Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                201,
                'Create Schedule Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/schedule/all
    async getAllSchedule(req, res) {
        try {
            ScheduleService.getAllSchedule().then((schedule) => {
                if (schedule === null) {
                    return BaseController.sendSuccess(
                        res,
                        null,
                        300,
                        'Get All Failed!',
                    );
                }
                return BaseController.sendSuccess(
                    res,
                    schedule,
                    201,
                    'Get All Success!',
                );
            });
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/schedule/:id
    async getSchedule(req, res) {
        try {
            const result = await ScheduleService.getSchedule(req.query.getId);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Schedule Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                201,
                'Get Schedule Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[DELETE] /api/schedule/:id
    async deleteSchedule(req, res) {
        try {
            const result = await ScheduleService.deleteSchedule(
                req.query.deleteId,
            );

            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Schedule Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                201,
                'Get Schedule Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
}

module.exports = new ScheduleController();
