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

  async findAllTasks(userId, whereConditions) {
    if (!userId) {
      throw new Error(USER_NOT_FOUND);
    }

    return await this.taskRepository.findAll(whereConditions);
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

  async updateTask(userId, taskId, taskData) {
    if (!userId) {
      throw new Error(USER_NOT_FOUND);
    }

    const task_data = { ...taskData };

    if (!taskId || Object.keys(task_data).length === 0) {
      throw new Error(TASK_NOT_FOUND);
    }

    const updatedTask = await this.taskRepository.update(task_data, taskId, userId);
    return updatedTask;
  }

  async updateTaskThroughSaveMethod(
    userId,
    title,
    description,
    status,
    priority,
    target_date,
    time_period,
    taskId
  ) {
    if (!userId) {
      throw new Error(USER_NOT_FOUND);
    }

    if (!taskId) {
      throw new Error(TASK_NOT_FOUND);
    }

    const task_data = {
      userId,
      title,
      description,
      status,
      priority,
      target_date,
      time_period,
    };

    if (!task_data) {
      throw new Error(TASK_NOT_FOUND);
    }

    return await this.taskRepository.save(taskId, task_data, userId);
  }

  async deleteTaskById(userId, taskId) {
    if (!userId) {
      throw new Error(USER_NOT_FOUND);
    }

    if (!taskId) {
      throw new Error(TASK_NOT_FOUND);
    }

    const deletedTask = await this.taskRepository.destroy(taskId, userId);
    if (!deletedTask) {
      throw new Error(TASK_NOT_FOUND);
    }
    return await deletedTask;
  }
}
