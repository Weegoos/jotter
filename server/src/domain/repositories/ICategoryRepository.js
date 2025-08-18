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
}
