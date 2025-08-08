import { ITasksRepository } from '../../domain/repositories/ITasksRepository.js';

export class SequelizeTasksRepositories extends ITasksRepository {
  constructor(taskDatabaseModel, userDatabaseModel) {
    super();
    this.taskDatabaseModel = taskDatabaseModel;
    this.userDatabaseModel = userDatabaseModel;
  }

  async create(taskData) {
    return await this.taskDatabaseModel.create({ ...taskData });
  }

  async findAll(userId) {
    return await this.taskDatabaseModel.findAll({
      where: { userId: userId },
    });
  }

  async findOne(userId, taskId) {
    return await this.taskDatabaseModel.findOne({
      where: { userId: userId, id: taskId },
    });
  }

  async update(taskData, taskId, userId) {
    const task = await this.taskDatabaseModel.findOne({
      where: { userId: userId, id: taskId },
    });

    if (!task) {
      throw new Error('TASK_NOT_FOUND'); // или твоя константа
    }

    await this.taskDatabaseModel.update(taskData, { where: { id: taskId } });
    return await task;
  }

  async save(taskId, taskData, userId) {
    const task = await this.taskDatabaseModel.findOne({
      where: { userId: userId, id: taskId },
    });

    if (!task) {
      throw new Error('TASK_NOT_FOUND'); // или твоя константа
    }

    task.title = taskData.title;
    task.description = taskData.description;
    task.status = taskData.status;
    task.priority = taskData.priority;
    task.target_date = taskData.target_date;
    task.time_period = taskData.time_period;

    await task.save();

    return task;
  }

  async destroy(taskId, userId) {
    const task = this.taskDatabaseModel.destroy({
      where: { userId: userId, id: taskId },
    });

    if (!task) {
      throw new Error('TASK_NOT_FOUND'); // или твоя константа
    }

    return task;
  }
}
