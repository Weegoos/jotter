export class TransactionController {
  constructor(transactionUseCase) {
    this.transactionUseCase = transactionUseCase;
  }

  async createTransaction(req, res) {
    try {
      const userId = req.user.id;
      const { amount, type, description, date, source, category_id } = req.body;

      const newCategory = await this.transactionUseCase.execute(
        userId,
        amount,
        type,
        description,
        date,
        source,
        category_id
      );

      return res.status(201).json({ message: 'Операция успешно создана', newCategory });
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
}
