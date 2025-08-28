import { wssSend } from '../wssSend.js';
export class TransactionController {
  constructor(transactionUseCase) {
    this.transactionUseCase = transactionUseCase;
  }

  async createTransaction(req, res) {
    try {
      const userId = req.user.id;
      const { amount, type, description, date, source, category_id } = req.body;

      const newTransaction = await this.transactionUseCase.execute(
        userId,
        amount,
        type,
        description,
        date,
        source,
        category_id
      );
      wssSend('new_transaction', newTransaction);
      return res.status(201).json({ message: 'Операция успешно создана', newTransaction });
    } catch (error) {
      console.error('Ошибка при создании задач:', error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
      if (error.message === 'CATEGORY_NOT_FOUND') {
        return res.status(404).json({ message: 'Категория не найдена' });
      }
      if (error.message === 'All fields are required') {
        return res.status(400).json({ message: 'Все поля обязательны' });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async findAllTransaction(req, res) {
    try {
      const userId = req.user.id;

      const transactions = await this.transactionUseCase.getTransaction(userId);
      const sum_income = transactions
        .map((t) => (t.type === 'income' ? Number(t.amount) : 0))
        .reduce((a, b) => a + b, 0);
      const sum_expense = transactions
        .map((t) => (t.type === 'expense' ? Number(t.amount) : 0))
        .reduce((a, b) => a + b, 0);
      const total_balance = sum_income - sum_expense;
      return res.status(201).json({ message: 'Операции успешно получены', transactions, total_balance });
    } catch (error) {
      console.error('Ошибка при создании задач:', error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }

      if (error.message === 'TRANSACTION_NOT_FOUND') {
        return res.status(404).json({ message: 'Операция не найдена' });
      }
    }
  }

  async findTransactionById(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const transactions = await this.transactionUseCase.getTransactionById(userId, id);

      return res.status(201).json({ message: 'Операция успешно получена', transactions });
    } catch (error) {
      console.error('Ошибка при создании задач:', error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }

      if (error.message === 'TRANSACTION_NOT_FOUND') {
        return res.status(404).json({ message: 'Операция не найдена' });
      }
    }
  }

  async deleteTransaction(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const deletedTransaction = await this.transactionUseCase.delete(id, userId);
      wssSend('deletedTransaction', deletedTransaction);
      return res.status(201).json({ message: 'Оперия успешно удалена', deletedTransaction });
    } catch (error) {
      console.error('Ошибка при создании задач:', error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }

      if (error.message === 'TRANSACTION_NOT_FOUND') {
        return res.status(404).json({ message: 'Операция не найдена' });
      }
    }
  }

  async partialTransactionUpdate(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const { amount, description, date, type, source } = req.body;

      const transaction_data = {
        amount,
        description,
        type,
        date,
        source,
      };

      const updatedTransaction = await this.transactionUseCase.updateTransaction(
        userId,
        id,
        transaction_data
      );
      return res.status(201).json({ message: 'Операция успешно обновлена', updatedTransaction });
    } catch (error) {
      console.error('Ошибка при создании задач:', error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }

      if (error.message === 'TRANSACTION_NOT_FOUND') {
        return res.status(401).json({ message: 'Операция не найдена' });
      }
    }
  }
}
