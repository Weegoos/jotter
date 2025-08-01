export class IUserRepository {
  /**
   * Найти пользователя по параметру
   * @param {*} parameter
   * @param {*} parameterValue
   */
  async findOne(parameter, parameterValue) {
    console.log(parameter, parameterValue);
    throw new Error('Method not implemented');
  }

  /**   * Создать пользователя
   * @param {*} userFullname
   * @param {*} userEmail
   * @param {*} userPassword
   */

  async create(userFullname, userEmail, userPassword) {
    console.log(userFullname, userEmail, userPassword);
    throw new Error('Method not implemented');
  }

  /**
   * Найти пользователя по первичному ключу
   * @param {Number} userId
   */

  async findByPk(userId) {
    console.log(userId);
    throw new Error('Method not implemented');
  }

  /**
   * Найти всех пользователей, кроме текущего
   * @param {Number} userId
   */

  async findAll(userId) {
    console.log(userId);
    throw new Error('Method not implemented');
  }
  /**
   * Поиск всех пользователей по введенному имени
   * Исключая текущего пользователя
   * @param {*} fullname
   * @param {Number} currentUserId
   */
  async findAllByInput(fullname, currentUserId) {
    console.log(fullname, currentUserId);
    throw new Error('Method not implemented');
  }
}
