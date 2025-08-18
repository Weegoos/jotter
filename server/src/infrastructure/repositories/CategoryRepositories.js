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

  async destroy(categoryId, userId) {
    const category = this.categoryModel.destroy({
      where: { userId: userId, id: categoryId },
    });

    if (!category) {
      throw new Error('CATEGORY_NOT_FOUND');
    }

    return category;
  }

  async update(categoryData, categoryId, userId) {
    const [updatedCount] = await this.categoryModel.update(categoryData, {
      where: { userId, id: categoryId },
    });

    if (updatedCount === 0) {
      throw new Error('CATEGORY_NOT_FOUND');
    }

    return await this.categoryModel.findOne({
      where: { userId, id: categoryId },
    });
  }
}
