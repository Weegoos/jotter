import { wssSend } from '../wssSend.js';

export class TaskControllers {
  constructor(taskUseCase) {
    this.taskUseCase = taskUseCase;
  }

  async createTask(req, res) {
    try {
      const userId = req.user.id;
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
      wssSend('createTask', newTask);
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

  async getAllTasks(req, res) {
    try {
      const { id } = req.user;
      console.log(id);

      const allTasks = await this.taskUseCase.findAllTasks(id, { userId: id });
      return res.status(200).json({ message: 'Все задачи успешно получены', allTasks });
    } catch (error) {
      console.error('Ошибка при получении всех задач:', error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async getTaskById(req, res) {
    try {
      const { id } = req.user;
      const { taskId: taskId } = req.params;

      const task = await this.taskUseCase.findTaskById(id, taskId);
      return await res.status(200).json({ message: 'Заметка получена', task });
    } catch (error) {
      console.error('Ошибка при получении задач по ID:', error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }

      if (error.message === 'TASK_NOT_FOUND') {
        return res.status(401).json({ message: 'Задача не найдена' });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async getCalendarView(req, res) {
    try {
      const userId = req.user.id;
      const { target_date } = req.query;

      const tasks = await this.taskUseCase.findAllWithOpUseCase(userId, target_date, target_date);
      wssSend('getCalendarView', tasks);
      return res.status(200).json({ message: 'Задачи успешно получены', tasks });
    } catch (error) {
      console.error('Ошибка при получении задач по дням:', error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }
      if (error.message === 'Tasks not found') {
        return res.status(401).json({ message: 'Задачи не найдены' });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async getTaskSummary(req, res) {
    try {
      const userId = req.user.id;
      const { from_date, to_date } = req.query;

      const tasks = await this.taskUseCase.findAllWithOpUseCase(userId, from_date, to_date);
      const total = tasks.length;
      const pending = tasks.filter((task) => task.status === 'pending').length;
      const completed = tasks.filter((task) => task.status === 'done').length;
      const in_progress = tasks.filter((task) => task.status === 'in_progress').length;
      const avg_completion_percent = Math.round((completed / total) * 100);

      return res.status(200).json({
        message: 'Задачи успешно получены',
        total: total,
        pending: pending,
        completed: completed,
        in_progress: in_progress,
        avg_completion_percent: avg_completion_percent,
        tasks,
      });
    } catch (error) {
      console.error('Ошибка при получении задач по календарю:', error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }
      if (error.message === 'Tasks not found') {
        return res.status(401).json({ message: 'Задачи не найдены' });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async partialTaskUpdate(req, res) {
    try {
      const userId = req.user.id;
      const { title, description, status, priority, target_date, time_period } = req.body;
      const { taskId } = req.params;

      const task_data = {
        title,
        description,
        status,
        priority,
        target_date,
        time_period,
      };

      const updatedTask = await this.taskUseCase.updateTask(userId, taskId, task_data);
      return res.status(201).json({ message: 'Заметка успешно обновлена', updatedTask });
    } catch (error) {
      console.error('Ошибка при обвнолении задач по ID:', error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }

      if (error.message === 'TASK_NOT_FOUND') {
        return res.status(401).json({ message: 'Задача не найдена или доступ запрещен' });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async completelyUpdateTheTask(req, res) {
    try {
      const userId = req.user.id;
      const { title, description, status, priority, target_date, time_period } = req.body;
      const { taskId } = req.params;

      const updatedTask = await this.taskUseCase.updateTaskThroughSaveMethod(
        userId,
        title,
        description,
        status,
        priority,
        target_date,
        time_period,
        taskId
      );

      return res.status(201).json({ message: 'Заметка успешно обновлена', updatedTask });
    } catch (error) {
      console.error('Ошибка при обновлении задач по ID:', error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }

      if (error.message === 'TASK_NOT_FOUND') {
        return res.status(401).json({ message: 'Задача не найдена или доступ запрещен' });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async destroyTaskById(req, res) {
    try {
      const userId = req.user.id;
      const { taskId } = req.params;

      const deletedTask = await this.taskUseCase.deleteTaskById(userId, taskId);
      wssSend('deleteTask', deletedTask)
      return res.status(201).json({ message: 'Заметка успешно удалена', deletedTask });
    } catch (error) {
      console.error('Ошибка при удалении задач по ID:', error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }

      if (error.message === 'TASK_NOT_FOUND') {
        return res.status(401).json({ message: 'Задача не найдена или доступ запрещен' });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async updateTaskStatus(req, res) {
    try {
      const userId = req.user.id;
      const { status } = req.body;
      const { taskId } = req.params;

      if (!status) {
        return res.status(401).json({ message: 'Статус не найден' });
      }

      const updatedTask = await this.taskUseCase.updateTask(userId, taskId, { status });
      wssSend('updateTaskStatus', updatedTask);
      return res.status(200).json({ message: 'Статус задачи успешно обновлен', updatedTask });
    } catch (error) {
      console.error('Ошибка при обновлении статуса задачи по ID:', error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }

      if (error.message === 'TASK_NOT_FOUND') {
        return res.status(401).json({ message: 'Задача не найдена или доступ запрещен' });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async updateTaskPriority(req, res) {
    try {
      const userId = req.user.id;
      const { priority } = req.body;
      const { taskId } = req.params;

      if (!priority) {
        return res.status(401).json({ message: 'Приоритет задачи не найден' });
      }

      const updatedTask = await this.taskUseCase.updateTask(userId, taskId, { priority });
      return res.status(200).json({ message: 'Приоритет задачи успешно обновлен', updatedTask });
    } catch (error) {
      console.error('Ошибка при обновлении приоритета задачи по ID:', error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }

      if (error.message === 'TASK_NOT_FOUND') {
        return res.status(401).json({ message: 'Задача не найдена или доступ запрещен' });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}
