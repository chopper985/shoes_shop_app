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
                    'Create User Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                201,
                'Create User Success!',
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
                    'Get User Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                about,
                201,
                'Get User Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
}

module.exports = new AboutController();
