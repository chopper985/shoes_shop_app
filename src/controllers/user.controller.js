const UserService = require('../services/user.service');
const BaseController = require('./baseController');

class UserController{
    constructor(){
    }
    async createUser(req, res){
        try{
            console.log(BaseController.sendSuccess);
            const result = await UserService.create(req.body);
            console.log(result);
            if (result === null){
                return BaseController.sendSuccess(res,null,300,'Create User Failed!')
            }
            return BaseController.sendSuccess(res,result,201,'Create User Success!');
        }catch(e){
            console.log(e);
            return BaseController.sendError(res,e.message);
        }
    }
}

module.exports = new UserController();