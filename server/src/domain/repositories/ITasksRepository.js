export class ITasksRepository {
  /**
   * Создать новую заметку
   * @param {Object || Array} taskData
   */
  async create(taskData) {
    console.log(taskData);
    throw new Error('The function create must be implemented');
  }

  /**
   *
   * @param {Number} userId
   */

  async findAll(userId) {
    console.log(userId);
    throw new Error('The function findAll must be implemented');
  }

  /**
   *
   * @param {Number} userId
   * @param {Number} taskId
   */

  async findOne(userId, taskId) {
    console.log(userId, taskId);
    throw new Error('The function findOne must be implemented');
  }

  /**
   *
   * @param {Object} taskData
   * @param {Number} taskId
   */

  async update(taskData, taskId) {
    console.log(taskData, taskId);
    throw new Error('The function update must be implemented');
  }
}
