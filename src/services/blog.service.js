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
    async getAllBlog(filter = {}) {
        try {
            const result = await this.search(filter);
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
}
module.exports = new BlogService();
