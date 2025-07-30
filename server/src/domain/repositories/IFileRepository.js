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
}
