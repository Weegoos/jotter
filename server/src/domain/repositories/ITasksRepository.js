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
   * Найти все задачи этого пользователя
   * @param {Number} userId
   */

  async findAll(userId) {
    console.log(userId);
    throw new Error('The function findAll must be implemented');
  }

  /**
   * Найти задачи по дня
   * @param {Number} userId
   * @param {Date} from_date
   * @param {Date} to_date
   */

  async findAllWithOp(userId, from_date, to_date) {
    console.log(userId, from_date, to_date);
    throw new Error('The function findAllWithOp must be implemented');
  }

  /**
   * Найти задачу этого пользователя
   * @param {Number} userId
   * @param {Number} taskId
   */

  async findOne(userId, taskId) {
    console.log(userId, taskId);
    throw new Error('The function findOne must be implemented');
  }

  /**
   * Частично обновить задачу
   * @param {Object} taskData
   * @param {Number} taskId
   * @param {Number} userId
   */

  async update(taskData, taskId, userId) {
    console.log(taskData, taskId, userId);
    throw new Error('The function update must be implemented');
  }

  /**
   * Обновить полностью задачу
   * @param {Number} taskId
   * @param {Object} taskData
   * @param {Number} userId
   */

  async save(taskId, taskData, userId) {
    console.log(taskId, taskData, userId);
    throw new Error('The function save must be implemented');
  }

  /**
   * Удалить задачу
   * @param {Number} taskId
   * @param {Number} userId
   */

  async destroy(taskId, userId) {
    console.log(taskId, userId);
    throw new Error('The function destroy must be implemented');
  }
}
