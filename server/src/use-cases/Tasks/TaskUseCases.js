const USER_NOT_FOUND = 'USER_NOT_FOUND';

export class TaskUseCases {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(userId, title, description, status, priority, target_date, time_period) {
    if (!userId) {
      throw new Error(USER_NOT_FOUND);
    }
    if (!title || !description || !status || !priority || !target_date || !time_period) {
      throw new Error('All fields are required');
    }

    const taskData = {
      userId,
      title,
      description,
      status,
      priority,
      target_date,
      time_period,
    };

    return await this.taskRepository.create(taskData);
  }

  async findAllTasks(userId) {
    if (!userId) {
      throw new Error(USER_NOT_FOUND);
    }

    return await this.taskRepository.findAll(userId);
  }
}
