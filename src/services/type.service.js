// const typeModel = require('../models/type.model');
// const BaseService = require('../services/baseService');

// class TypeService extends BaseService {
//   constructor() {
//     super(typeModel);
//   }
//   async createType(payload) {
//     try {
//       const result = await this.create(payload);
//       return result;
//     } catch (e) {
//       return null;
//     }
//   }
//   async getTypeByProduct(filter = {}) {
//     try {
//       const result = await this.findOne(filter);
//       return result;
//     } catch (e) {
//       return null;
//     }
//   }
//   async getAllType() {
//     try {
//       const result = await this.findAll();
//       console.log(result);
//       return result;
//     } catch (e) {
//       return null;
//     }
//   }
//   async getType(filter = {}) {
//     try {
//       const result = await this.findOne(filter);
//       return result;
//     } catch (e) {
//       return null;
//     }
//   }
//   async getTypeById(id) {
//     try {
//       const result = await this.findById(id);
//       return result;
//     } catch (e) {
//       return null;
//     }
//   }
//   async updateType(id, item) {
//     try {
//       const result = await this.findByIdAndUpdate(id, item);
//       return result;
//     } catch (e) {
//       return null;
//     }
//   }
//   async deleteType(id) {
//     try {
//       const result = await this.findByIdAndRemove(id);
//       return result;
//     } catch (e) {
//       return null;
//     }
//   }
// }
// module.exports = new TypeService();
