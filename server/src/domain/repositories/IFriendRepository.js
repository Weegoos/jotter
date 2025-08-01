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

  async findOne(whereConditions) {
    console.log(whereConditions);

    throw new Error('Method not implemented');
  }
}
