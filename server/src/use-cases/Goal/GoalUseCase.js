const USER_NOT_FOUND = 'USER_NOT_FOUND';
const GOAL_NOT_FOUND = 'GOAL_NOT_FOUND';

export class GoalUseCase {
  constructor(goalRepository) {
    this.goalRepository = goalRepository;
  }

  async execute(userId, name, target_amount, deadline, status) {
    if (!userId) {
      throw new Error(USER_NOT_FOUND);
    }

    if (!name || !target_amount || !deadline || !status) {
      throw new Error('All fields are required');
    }

    const goalData = {
      userId,
      name,
      target_amount,
      deadline,
      status
    };

    return await this.goalRepository.create(goalData);
  }

  async getGoal(userId) {
    if (!userId) {
      throw new Error(USER_NOT_FOUND);
    }

    const goals = await this.goalRepository.findAll(userId);
    if (!goals) {
      throw new Error(GOAL_NOT_FOUND);
    }

    return goals;
  }

  async updateGoal(goalData, goalId, userId) {
    if (!userId) {
      throw new Error(USER_NOT_FOUND);
    }

    const updatedGoalData = { ...goalData };

    if (!goalId || Object.keys(updatedGoalData).length === 0) {
      throw new Error(GOAL_NOT_FOUND);
    }

    const updatedGoal = await this.goalRepository.update(updatedGoalData, goalId, userId);

    return updatedGoal;
  }

  async delete(goalId, userId) {
    if (!userId) {
      throw new Error(USER_NOT_FOUND);
    }

    if (!goalId) {
      throw new Error(GOAL_NOT_FOUND);
    }

    const deletedGoal = await this.goalRepository.destroy(goalId, userId);

    if (!deletedGoal || (Array.isArray(deletedGoal) && deletedGoal.length === 0)) {
      throw new Error(GOAL_NOT_FOUND);
    }

    return deletedGoal;
  }
}
