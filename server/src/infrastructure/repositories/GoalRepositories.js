import { IGoalRepository } from '../../domain/repositories/IGoalRepository.js';

export class SequelizeGoalRepository extends IGoalRepository {
  constructor(goalModel) {
    super();
    this.goalModel = goalModel;
  }

  async create(goalData) {
    const newGoal = await this.goalModel.create({
      ...goalData,
    });

    return newGoal;
  }
}
