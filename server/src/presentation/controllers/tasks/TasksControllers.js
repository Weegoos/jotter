export class TaskControllers {
  constructor(taskUseCase) {
    this.taskUseCase = taskUseCase;
  }

  async createTask(req, res) {
    try {
      const userId = req.user.id;
      console.log(userId);
      const { title, description, status, priority, target_date, time_period } = req.body;
      const newTask = await this.taskUseCase.execute(
        userId,
        title,
        description,
        status,
        priority,
        target_date,
        time_period
      );
      return res.status(201).json({ message: 'Задача успешно создана', newTask });
    } catch (error) {
      console.error('Ошибка при создании задач:', error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }

      if (error.message === 'All fields are required') {
        return res.status(400).json({ message: 'Все поля обязательны' });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}
