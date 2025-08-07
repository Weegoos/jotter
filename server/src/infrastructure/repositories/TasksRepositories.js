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

  async update(taskData, taskId) {
    await this.taskDatabaseModel.update(taskData, { where: { id: taskId } });
    return await this.taskDatabaseModel.findByPk(taskId);
  }
}
