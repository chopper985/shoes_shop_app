const blogModel = require('../models/blog.model');
const BaseService = require('../services/baseService');

class BlogService extends BaseService {
    constructor() {
        super(blogModel);
    }
    async createBlog(payload) {
        try {
            const result = await this.create(payload);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getAllBlog(filter = {}, limit, skip) {
        try {
            const result = await this.getLimitSkip(filter, limit, skip);
            console.log(result);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getAll(filter = {}) {
        try {
            const result = await this.findAll(filter);
            console.log(result);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getBlog(filter = {}) {
        try {
            const result = await this.findOne(filter);
            return result;
        } catch (e) {
            return null;
        }
    }
    async getDifferentBlogs(id) {
        try {
            const result = await this.getNew(
                { isDeleted: false, _id: { $ne: id } },
                { updatedAt: -1 },
            );
            return result;
        } catch (e) {
            return null;
        }
    }
    async updateBlog(id, item) {
        try {
            const result = await this.findByIdAndUpdate(id, item);
            return result;
        } catch (e) {
            return null;
        }
    }
    async deleteBlog(id) {
        try {
            const result = await this.findByIdAndRemove(id);
            return result;
        } catch (e) {
            return null;
        }
    }
    async countBlog() {
        try {
            const result = await this.count();
            return result;
        } catch (e) {
            return null;
        }
    }
}
module.exports = new BlogService();
