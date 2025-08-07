const USER_NOT_FOUND = 'USER_NOT_FOUND';
const TASK_NOT_FOUND = 'TASK_NOT_FOUND';

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

  async findTaskById(userId, taskId) {
    if (!userId) {
      throw new Error(USER_NOT_FOUND);
    }

    if (!taskId) {
      throw new Error(TASK_NOT_FOUND);
    }

    const task = await this.taskRepository.findOne(userId, taskId);
    if (!task) {
      throw new Error(TASK_NOT_FOUND);
    }
    return await task;
  }
}
