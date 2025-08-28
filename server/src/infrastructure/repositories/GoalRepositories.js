import { IGoalRepository } from '../../domain/repositories/IGoalRepository.js';

export class SequelizeGoalRepository extends IGoalRepository {
  constructor(goalModel, transactionModel) {
    super();
    this.goalModel = goalModel;
    this.transactionModel = transactionModel
  }

  async create(goalData) {
    const newGoal = await this.goalModel.create({
      ...goalData,
    });

    return newGoal;
  }

  async findAll(userId) {
    return await this.goalModel.findAll({
      where: { userId: userId },
    });
  }

  async update(goalData, goalId, userId) {
    const [updatedGoal] = await this.goalModel.update(goalData, {
      where: { userId, id: goalId },
    });

    if (updatedGoal === 0) {
      throw new Error('GOAL_NOT_FOUND');
    }

    return await this.goalModel.findOne({
      where: { userId, id: goalId },
    });
  }

  async destroy(goalId, userId) {
    const goal = await this.goalModel.destroy({
      where: { userId: userId, id: goalId },
    });

    return goal;
  }
}
