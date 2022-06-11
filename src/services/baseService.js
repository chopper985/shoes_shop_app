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
    async findAll() {
        return this._model.find().sort({ updatedAt: -1 });
    }
    async search(filter = {}) {
        return this._model.find(filter).sort({ updatedAt: -1 });
    }
    async create(item) {
        return this._model.create(item);
    }
    async findByIdAndRemove(id) {
        return this._model.findByIdAndRemove(id);
    }
    async count() {
        return this._model.find().countDocuments();
    }
    async countFilter(filter = {}) {
        return this._model.find().countDocuments(filter);
    }
    async getNew(filter = {}, orderBy = {}) {
        return this._model.find(filter).sort(orderBy).limit(5);
    }
    async getLimitSkip(filter = {}, limit, skip) {
        return this._model
            .find(filter)
            .sort({ updatedAt: -1 })
            .skip(Number(limit) * Number(skip) - Number(limit))
            .limit(Number(limit));
    }
    async updateField(one = {}, update = {}) {
        return this._model.findOneAndUpdate(one, update, {
            new: true,
        });
    }
}
module.exports = BaseService;
