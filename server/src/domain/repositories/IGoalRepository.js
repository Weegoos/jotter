export class IGoalRepository {
  /**
   * Создать цель
   * @param {Object} goalData
   */
  async create(goalData) {
    console.log(goalData);
    throw new Error('create function should be used');
  }

  /**
   * Найти все цель по ID
   * @param {Number} userId
   */
  async findAll(userId) {
    console.log(userId);
    throw new Error('findAll function should be used');
  }

  /**
   * Частично обновить цель по ID
   * @param {Object} goalData 
   * @param {Number} goalId 
   * @param {Number} userId 
   */

  async update(goalData, goalId, userId) {
    console.log(goalData, goalId, userId);
     throw new Error('update function should be used');
  }
  /**
   * Удалить цель по ID
   * @param {Number} goalId 
   * @param {Number} userId 
   */
  async destroy(goalId, userId) {
    console.log(goalId, userId);
     throw new Error('destroy function should be used');
    
  }
}
