const AboutService = require('../services/about.service');
const BaseController = require('./baseController');

class AboutController {
    constructor() {}
    //[POST] /api/about/create
    async createAbout(req, res) {
        try {
            const result = await AboutService.create(req.body);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Create About Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                201,
                'Create About Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/about/getAbout/{getId}
    async getAbout(req, res) {
        try {
            const result = await AboutService.getAbout(req.query.getId);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get About Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                201,
                'Get About Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[POST] /api/about/update
    async updateAbout(req, res) {
        try {
            const about = await AboutService.updateAbout(
                req.body._id,
                req.body,
            );
            if (about === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Update  Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                about,
                201,
                'Update Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
}

module.exports = new AboutController();
