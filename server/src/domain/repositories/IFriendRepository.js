export class IFriendRepository {
  /**
   * Найти всех друзей по условиям
   * @param {*} whereConditions
   * @param {*} orderConditions
   */
  async findAll(whereConditions, orderConditions = {}) {
    console.log(whereConditions, orderConditions);

    throw new Error('Method not implemented');
  }

  /**
   * Найти одного друга по условиям
   * @param {*} whereConditions
   */

  async findOneFromUser(whereConditions) {
    console.log(whereConditions);

    throw new Error('Method not implemented');
  }

  /**
   * Найти одного друга по условиям
   * @param {*} whereConditions
   */

  async findOneFromFriend(whereConditions) {
    console.log(whereConditions);

    throw new Error('Method not implemented');
  }

  /**
   * Создать друга
   * @param {Object} friendData - Данные друга, которые нужно создать
   * @returns {Promise<Object>} - Возвращает созданного друга
   * @param {Object} friendData
   */

  async create(friendData) {
    console.log(friendData);

    throw new Error('Method not implemented');
  }
}
