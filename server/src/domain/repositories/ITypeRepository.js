export class IHashtagRepository {
  /**
   * Найти все типы по заданным параметрам
   * @param {*} userAttributes
   * @param {*} whereCondition
   * @param {*} userRaw
   * @param {*} sequelizeCondition
   */
  async findAllFromType(
    userAttributes = {},
    whereCondition = {},
    userRaw = true,
    sequelizeCondition = {}
  ) {
    console.log(userAttributes, whereCondition, userRaw, sequelizeCondition);

    throw new Error('Method not implemented');
  }

  /**
   * Найти все заметки по заданным параметрам
   * @param {*} userAttributes
   * @param {*} whereCondition
   * @param {*} userRaw
   * @param {*} sequelizeCondition
   */

  async findAllFromNote(
    userAttributes = {},
    whereCondition = {},
    userRaw = true,
    sequelizeCondition = {}
  ) {
    console.log(userAttributes, whereCondition, userRaw, sequelizeCondition);

    throw new Error('Method not implemented');
  }
}
