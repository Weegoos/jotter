const USER_NOT_FOUND = 'USER_NOT_FOUND';
const GOAL_NOT_FOUND = 'GOAL_NOT_FOUND';

export class GoalUseCase {
  constructor(goalRepository) {
    this.goalRepository = goalRepository;
  }

  async execute(userId, name, target_amount, current_amount, deadline) {
    if (!userId) {
      throw new Error(USER_NOT_FOUND);
    }

    if (!name || !target_amount || !current_amount || !deadline) {
      throw new Error('All fields are required');
    }

    const goalData = {
      userId,
      name,
      target_amount,
      current_amount,
      deadline,
    };

    return await this.goalRepository.create(goalData);
  }
}
