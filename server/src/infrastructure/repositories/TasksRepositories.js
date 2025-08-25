import { ITasksRepository } from '../../domain/repositories/ITasksRepository.js';

export class SequelizeTasksRepositories extends ITasksRepository {
  constructor(taskDatabaseModel, userDatabaseModel, opModel) {
    super();
    this.taskDatabaseModel = taskDatabaseModel;
    this.userDatabaseModel = userDatabaseModel;
    this.opModel = opModel;
  }

  async create(taskData) {
    return await this.taskDatabaseModel.create({ ...taskData });
  }

  async findAll(userId) {
    return await this.taskDatabaseModel.findAll({
      where: { userId: userId },
      order: [['id', 'DESC']]
    });
  }

  async findAllWithOp(userId, from_date, to_date) {
    return await this.taskDatabaseModel.findAll({
      where: {
        userId: userId,
        target_date: {
          [this.opModel.between]: [
            new Date(`${from_date}T00:00:00`),
            new Date(`${to_date}T23:59:59`),
          ],
        },
      },
      order: [['id', 'DESC']],
    });
  }

  async findOne(userId, taskId) {
    return await this.taskDatabaseModel.findOne({
      where: { userId: userId, id: taskId },
    });
  }

  async update(taskData, taskId, userId) {
    const [updatedCount] = await this.taskDatabaseModel.update(taskData, {
      where: { userId, id: taskId },
    });

    if (updatedCount === 0) {
      throw new Error('TASK_NOT_FOUND');
    }

    return await this.taskDatabaseModel.findOne({
      where: { userId, id: taskId },
    });
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
      throw new Error('TASK_NOT_FOUND');
    }

    return task;
  }
}
