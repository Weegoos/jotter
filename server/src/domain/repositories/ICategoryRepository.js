export class ICategoryRepository {
  /**
   * Создать категорию
   * @param {*} categoryData
   */
  async create(categoryData) {
    console.log(categoryData);
    throw new Error('Create function should be used');
  }

  /**
   * Найти все категории пользователя по ID
   * @param {Number} userId
   */

  async findAll(userId) {
    console.log(userId);
    throw new Error('findAll function should be used');
  }

  /**
   * Удалить категорию пользователя по ID
   * @param {Number} categoryId
   * @param {Number} userId
   */

  async destroy(categoryId, userId) {
    console.log(categoryId, userId);
    throw new Error('destroy function should be used');
  }

  /**
   * Частично обновить категорию
   * @param {Object} categoryData
   * @param {Number} categoryId
   * @param {Number} userId
   */
  async update(categoryData, categoryId, userId) {
    console.log(categoryData, categoryId, userId);
    throw new Error('update function should be used');
  }
}
