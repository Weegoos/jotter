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
}
