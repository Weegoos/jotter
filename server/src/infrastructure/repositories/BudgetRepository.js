import { IBudgetRepository } from '../../domain/repositories/IBudgetRepository.js';

export class SequelizeBudgetRepository extends IBudgetRepository {
  constructor(budgetModel, categoryModel) {
    super();
    ((this.budgetModel = budgetModel), (this.categoryModel = categoryModel));
  }

  async create(budgetData, categoryId) {
    const category = await this.categoryModel.findByPk(categoryId);

    if (!category) {
      throw new Error('CATEGORY_NOT_FOUND');
    }

    const newBudget = await this.budgetModel.create({
      ...budgetData,
      category_id: category.id,
    });

    return newBudget;
  }

  async findAll(userId) {
    return await this.budgetModel.findAll({
      where: { userId: userId },
    });
  }
}
