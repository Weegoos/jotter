export class ITransactionRepository {
  /**
   * Создать операцию
   * @param {Object || Array} transactionData
   * @param {Number} category_id
   */
  async create(transactionData, category_id) {
    console.log(transactionData, category_id);
    throw new Error('Create function should be used ');
  }

  /**
   * Найти все операции по ID пользователя
   * @param {Number} userId
   */
  async findAll(userId) {
    console.log(userId);
    throw new Error('findAll function should be used ');
  }

  /**
   * Найти операцию пользователя по ID
   * @param {Number} userId
   * @param {Number} transaction_id
   */
  async findAllById(userId, transaction_id) {
    console.log(userId, transaction_id);
    throw new Error('findAllById function should be used ');
  }

  /**
   * Удалить операцию по ID
   * @param {Number} transactionId
   * @param {Number} userId
   */
  async destroy(transactionId, userId) {
    console.log(transactionId, userId);
    throw new Error('destroy function should be used ');
  }

  /**
   * Частичное обновление операции
   * @param {Object || Array} transactionData
   * @param {Number} transactionId
   * @param {Number} userId
   */
  async update(transactionData, transactionId, userId) {
    console.log(transactionData, transactionId, userId);
    throw new Error('update function should be used ');
  }
}
