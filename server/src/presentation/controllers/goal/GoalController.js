export class GoalController {
  constructor(goalUseCase) {
    this.goalUseCase = goalUseCase;
  }

  async createGoal(req, res) {
    try {
      const userId = req.user.id;
      const { name, target_amount, current_amount, deadline } = req.body;

      const newGoal = await this.goalUseCase.execute(
        userId,
        name,
        target_amount,
        current_amount,
        deadline
      );

      return res.status(201).json({ message: 'Цель успешно создана', newGoal });
    } catch (error) {
      console.error('Ошибка при создании задач:', error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
      if (error.message === 'All fields are required') {
        return res.status(400).json({ message: 'Все поля обязательны' });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}
