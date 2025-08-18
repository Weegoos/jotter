import { ICategoryRepository } from '../../domain/repositories/ICategoryRepository.js';

export class SequelizeCategory extends ICategoryRepository {
  constructor(categoryModel) {
    super();
    this.categoryModel = categoryModel;
  }

  async create(categoryData) {
    return await this.categoryModel.create({ ...categoryData });
  }

  async findAll(userId) {
    return await this.categoryModel.findAll({
      where: { userId: userId },
    });
  }
}
