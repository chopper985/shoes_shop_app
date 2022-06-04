const CartService = require('../services/cart.service');
const BaseController = require('./baseController');

class CartController {
    constructor() {}
    //[POST] /api/cart/create
    async createCart(req, res) {
        try {
            console.log(req.body);
            const result = await CartService.create(req.body);
            result.idAccount = req.value.body.decodeToken._id;
            result.save();
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Create Cart Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                200,
                'Create Cart Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/cart/getAllCart
    async getAllCart(req, res) {
        try {
            await CartService.getAllCart({
                idAccount: req.value.body.decodeToken._id,
                isDeleted: false,
            }).then((product) => {
                if (product === null) {
                    return BaseController.sendSuccess(
                        res,
                        null,
                        300,
                        'Get All Failed!',
                    );
                }
                return BaseController.sendSuccess(
                    res,
                    product,
                    200,
                    'Get All Success!',
                );
            });
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[GET] /api/cart/getCart/{getId}
    async getCart(req, res) {
        try {
            const result = await CartService.getCart({
                _id: req.query.getId,
                isDeleted: false,
            });
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Cart Failed!',
                );
            }
            return BaseController.sendSuccess(
                res,
                result,
                200,
                'Get Cart Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[POST] /api/cart/update
    async updateAmountCart(req, res) {
        try {
            const cart = await CartService.getCart(req.body._id);
            if (cart) {
                cart.amount = req.body.amount;
                cart.save();
                return BaseController.sendSuccess(
                    res,
                    cart,
                    200,
                    'Update Success!',
                );
            }
            return BaseController.sendSuccess(
                res,
                null,
                300,
                'Update  Failed!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[POST] /api/cart/deleteMultiCart
    async deleteMultiCart(req, res) {
        try {
            for (var i = 0; i < req.body.lstCartId.length; i++) {
                console.log(req.body.lstCartId[i]);
                if (req.body.lstCartId[i].match(/^[0-9a-fA-F]{24}$/)) {
                    console.log(req.body.lstCartId[i]);
                    await CartService.findByIdAndRemove(req.body.lstCartId[i]);
                }
            }
            return BaseController.sendSuccess(
                res,
                null,
                200,
                'Get Cart Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
    //[DELETE] /api/cart/delete/:id
    async deleteCart(req, res) {
        try {
            const result = await CartService.findById(req.query.getId);
            if (result === null) {
                return BaseController.sendSuccess(
                    res,
                    null,
                    300,
                    'Get Cart Failed!',
                );
            }
            result.isDeleted = true;
            result.save();
            return BaseController.sendSuccess(
                res,
                result,
                200,
                'Get Cart Success!',
            );
        } catch (e) {
            return BaseController.sendError(res, e.message);
        }
    }
}

module.exports = new CartController();
