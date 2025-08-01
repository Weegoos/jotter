export class IHashtagRepository {
  /**
   * Найти все типы по заданным параметрам
   * @param {*} userAttributes
   * @param {*} whereCondition
   * @param {*} userRaw
   * @param {*} sequelizeCondition
   */
  async findAll(userAttributes = {}, whereCondition = {}, userRaw = true, sequelizeCondition = {}) {
    console.log(userAttributes, whereCondition, userRaw, sequelizeCondition);

    throw new Error('Method not implemented');
  }
}
