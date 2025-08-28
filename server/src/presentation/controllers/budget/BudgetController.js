import { wssSend } from '../wssSend.js';
export class BudgetController {
  constructor(budgetUseCase) {
    this.budgetUseCase = budgetUseCase;
  }

  async createBudget(req, res) {
    try {
      const userId = req.user.id;
      const { limit_amount, month, year, category_id } = req.body;

      const newBudget = await this.budgetUseCase.execute(
        userId,
        limit_amount,
        month,
        year,
        category_id
      );
      wssSend('newBudget', newBudget);
      return res.status(201).json({ message: 'Бюджет успешно создан', newBudget });
    } catch (error) {
      console.error('Ошибка при создании бюджета:', error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }
      if (error.message === 'CATEGORY_NOT_FOUND') {
        return res.status(404).json({ message: 'Категория не найдена' });
      }
      if (error.message === 'All fields are required') {
        return res.status(400).json({ message: 'Все поля обязательны' });
      }
      return res.status(500).json({ message: 'Ошибка', error });
    }
  }

  async getAllBudgets(req, res) {
    try {
      const userId = req.user.id;
      const budgets = await this.budgetUseCase.getBudgets(userId);

      return res.status(200).json({ message: 'Бюджеты успешно получены', budgets });
    } catch (error) {
      console.error('Ошибка при получении бюджета:', error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }
      if (error.message === 'BUDGET_NOT_FOUND') {
        return res.status(404).json({ message: 'Бюджеты не найдены' });
      }
      return res.status(500).json({ message: 'Ошибка', error });
    }
  }

  async partialUpdateBudget(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const { limit_amount, month, year } = req.body;

      const budget_data = {
        limit_amount,
        month,
        year,
      };

      const updatedBudget = await this.budgetUseCase.updateBudget(userId, id, budget_data);
      return res.status(200).json({ message: 'Бюджет частично обновлен', updatedBudget });
    } catch (error) {
      console.error('Ошибка при частичном изменении бюджета:', error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }
      if (error.message === 'BUDGET_NOT_FOUND') {
        return res.status(404).json({ message: 'Бюджет не найден' });
      }
      return res.status(500).json({ message: 'Ошибка', error });
    }
  }

  async deleteBudget(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const deletedBudget = await this.budgetUseCase.delete(id, userId);
      wssSend('deletedBudget', deletedBudget);
      return res.status(201).json({ message: 'Бюджет успешно удален', deletedBudget });
    } catch (error) {
      console.error('Ошибка при удалении бюджета:', error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }

      if (error.message === 'BUDGET_NOT_FOUND') {
        return res.status(404).json({ message: 'Бюджет не найден' });
      }
    }
  }
}
