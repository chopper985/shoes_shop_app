class BaseService {
    constructor(model) {
        this._model = model;
    }
    async findOne(filter = {}) {
        return this._model.findOne(filter);
    }
    async findById(id) {
        return this._model.findById(id);
    }
    async findByIdAndUpdate(id, item) {
        return this._model.findByIdAndUpdate(id, item, { new: true });
    }
    async findAll(filter = {}) {
        return this._model.find(filter);
    }
    async create(item) {
        return this._model.create(item);
    }
}
module.exports = BaseService;
