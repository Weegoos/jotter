const CATEGORY_NOT_FOUND = 'CATEGORY_NOT_FOUND';
const BUDGET_NOT_FOUND = 'BUDGET_NOT_FOUND';
const USER_NOT_FOUND = 'USER_NOT_FOUND';

export class BudgetUseCase {
  constructor(budgetRepository) {
    this.budgetRepository = budgetRepository;
  }

  async execute(userId, limit_amount, month, year, category_id) {
    if (!userId) {
      throw new Error(USER_NOT_FOUND);
    }

    if (!category_id) {
      throw new Error(CATEGORY_NOT_FOUND);
    }

    if (limit_amount == null || month == null || year == null) {
      throw new Error('All fields are required');
    }

    const budgetData = {
      userId,
      limit_amount,
      month,
      year,
    };
    return await this.budgetRepository.create(budgetData, category_id);
  }

  async getBudgets(userId) {
    if (!userId) {
      throw new Error(USER_NOT_FOUND);
    }

    const budgets = await this.budgetRepository.findAll(userId);
    if (Object.keys(budgets).length === 0 || !budgets) {
      throw new Error(BUDGET_NOT_FOUND);
    }

    return budgets;
  }
}
