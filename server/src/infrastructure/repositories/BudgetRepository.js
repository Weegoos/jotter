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
      include: [{ model: this.categoryModel }],
    });
  }

  async update(userId, budgetId, budgetData) {
    const [updatedCount] = await this.budgetModel.update(budgetData, {
      where: {
        userId,
        id: budgetId,
      },
    });

    if (updatedCount === 0) {
      throw new Error('BUDGET_NOT_FOUND');
    }

    return await this.budgetModel.findOne({
      where: { userId, id: budgetId },
    });
  }

  async destroy(budgetId, userId) {
    const budget = await this.budgetModel.destroy({
      where: { userId: userId, id: budgetId },
    });

    if (!budget) {
      throw new Error('BUDGET_NOT_FOUND');
    }

    return budget;
  }
}
