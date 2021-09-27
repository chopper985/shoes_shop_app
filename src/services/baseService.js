class BaseService {
    constructor(model) {
        this._model = model;
    }
    async findOne(filter = {}) {
        return this._model.findOne(filter).exec().lean();
    }
    async findById(id) {
        return this._model.findById(id).exec().lean();
    }
    async findByIdAndUpdate(id, item) {
        return this._model.findByIdAndUpdate(id, item, { new: true }).exec().lean();
    }
    async findAll(filter = {}) {
        return this._model.find(filter).exec().lean();
    }
    async create(item) {
        return this._model.create(item);
    }
}
module.exports = BaseService;