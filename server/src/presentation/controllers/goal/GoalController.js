import { wssSend } from '../wssSend.js';

export class GoalController {
  constructor(goalUseCase) {
    this.goalUseCase = goalUseCase;
  }

  async createGoal(req, res) {
    try {
      const userId = req.user.id;
      const { name, target_amount, deadline, status = 'in_progress' } = req.body;

      const newGoal = await this.goalUseCase.execute(userId, name, target_amount, deadline, status);
      wssSend('newGoal', newGoal);
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

  async findAllGoals(req, res) {
    try {
      const userId = req.user.id;
      const goals = await this.goalUseCase.getGoal(userId);
      const goals_in_progress = goals.filter((g) => g.status === 'in_progress');
      console.log(goals_in_progress);

      const sum_target_amount = goals_in_progress
        .map((g) => Number(g.target_amount))
        .reduce((a, b) => a + b, 0);

      return res.status(200).json({ message: 'Цели успешно получены', goals, sum_target_amount });
    } catch (error) {
      console.error('Ошибка при получении целей', error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }

      if (error.message === 'GOAL_NOT_FOUND') {
        return res.status(404).json({ message: 'Цель не найдена' });
      }
    }
  }

  async partialGoalUpdate(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const { name, target_amount, deadline, status } = req.body;

      const goalData = {
        name,
        target_amount,
        deadline,
        status,
      };

      const updatedGoal = await this.goalUseCase.updateGoal(goalData, id, userId);
      return res.status(200).json({ message: 'Цель успешно обновлена', updatedGoal });
    } catch (error) {
      console.error(error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }
      if (error.message === 'GOAL_NOT_FOUND') {
        return res.status(404).json({ message: 'Цель не найдена' });
      }

      return res.status(500).json({ message: 'Ошибка', error });
    }
  }

  async deleteGoal(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const deletedGoal = await this.goalUseCase.delete(id, userId);
      wssSend('deletedGoal', deletedGoal);
      return res.status(201).json({ message: 'Цель успешно удалена', deletedGoal });
    } catch (error) {
      console.error(error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }
      if (error.message === 'GOAL_NOT_FOUND') {
        return res.status(404).json({ message: 'Цель не найдена' });
      }

      return res.status(500).json({ message: 'Ошибка', error });
    }
  }
}
