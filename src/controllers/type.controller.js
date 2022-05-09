const TypeService = require('../services/type.service');
const BaseController = require('./baseController');

class TypeController {
    constructor() {}
    //[POST] /api/type/create
    async createType(req, res) {
        try {
            const oldType = await TypeService.getType({
                size: req.body.size,
                color: req.body.color,
                isDeleted: false,
            });
            if (oldType === null) {
                const result = await TypeService.create(req.body);
                if (result === null) {
                    return BaseController.sendSuccess(
                        res,
                        null,
                        300,
                        'Create Type Failed!',
                    );
                }
                return BaseController.sendSuccess(
                    res,
                    result,
                    200,
                    'Create Type Success!',
                );
            } else {
                oldType.quantity += req.body.quantity;
                oldType.save();
                return BaseController.sendSuccess(
                    res,
                    oldType,
                    200,
                    'Update Type Success!',
                );
            }
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[DELETE] /api/type/delete/:id
    async deleteType(req, res) {
        try {
            const result = await TypeService.findById(req.query.getId);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Type Failed!',
                );
            }
            result.isDeleted = true;
            result.save();
            return BaseController.sendSuccess(
                res,
                result,
                200,
                'Get Type Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    // //[GET] /api/Type/getType/{getId}
    // async getType(req, res) {
    //  try {
    //   const result = await TypeService.getType(req.query.getId);
    //   if (result === null) {
    //    return BaseController.sendSuccess(
    //     res,
    //     null,
    //     300,
    //     'Get Type Failed!',
    //    );
    //   }
    //   return BaseController.sendSuccess(
    //    res,
    //    result,
    //    200,
    //    'Get Type Success!',
    //   );
    //  } catch (e) {
    //   return BaseController.sendError(res, e.message);
    //  }
    // }
    //[POST] /api/Type/update
    async updateType(req, res) {
        try {
            const type = await TypeService.updateType(req.body._id, req.body);
            if (type === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Update  Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                type,
                200,
                'Update Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
}

module.exports = new TypeController();
