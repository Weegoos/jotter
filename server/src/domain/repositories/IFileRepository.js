export class IFileRepository {
  /**
   * Найти один файл по его ID и ID пользователя
   * @param {Number} fileId
   * @param {Number} userId
   */
  async findOne(fileId, userId) {
    console.log(fileId, userId);

    throw new Error('Method findOne() not implemented');
  }

  /**
   * Создать новый файл
   * @param {Object|*} fileData
   */
  async create(fileData) {
    console.log(fileData);

    throw new Error('Method create() not implemented');
  }

  /**
   * Найти все файлы пользователя
   * @param {Number} userId
   */

  async findAll(userId) {
    console.log(userId);

    throw new Error('Method findAll() not implemented');
  }

  /**
   * Найти и посчитать все файлы пользователя с возможностью фильтрации по статусу, лимиту, смещению и закреплению
   * @param {Number} userId
   * @param {*} status
   * @param {*} limit
   * @param {*} page
   * @param {*} pinned
   */

  async findAndCountAll(userId, status, limit, page, pinned) {
    console.log(userId, status, limit, page, pinned);

    throw new Error('Method findAndCountAll() not implemented');
  }
}
