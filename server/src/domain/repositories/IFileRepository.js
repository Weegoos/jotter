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
}
