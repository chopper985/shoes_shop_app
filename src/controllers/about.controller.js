const AboutService = require('../services/about.service');
const BaseController = require('./baseController');

class AboutController {
    constructor() {}
    //[POST] /api/createCar/create
    async createAbout(req, res) {
        try {
            const result = await AboutService.create(req.body);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Create Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                201,
                'Create Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    } //[GET] /api/car/:id
    async getAbout(req, res) {
        try {
            const about = await AboutService.getAbout(req.query.about);
            if (about === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Failed!',
                );
            }
            return BaseController.sendSuccess(res, about, 201, 'Get Success!');
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    async updateAbout(req, res) {
        try {
            const about = await AboutService.updateAbout(
                req.query.aboutId,
                req.body,
            );
            if (about === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Failed!',
                );
            }
            return BaseController.sendSuccess(res, about, 201, 'Get Success!');
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
}

module.exports = new AboutController();
