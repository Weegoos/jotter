export class INoteRepository {
  /**
   * Получить все заметки по фильтру, привязанные к userId и fileId
   * @param {Object} filter - Sequelize-совместимый where-объект
   * @param {number} userId - ID пользователя
   * @param {number} fileId - ID файла
   * @returns {Promise<Array>}
   */
  async getAllByFilter(filter, userId, fileId) {
    console.log(filter, userId, fileId);
    throw new Error('Method getAllByFilter() must be implemented');
  }

  /**
   * Найти одну заметку по noteId и userId
   * @param {number} noteId
   * @param {number} userId
   * @returns {Promise<Object|null>}
   */
  async findByIdAndUser(noteId, userId) {
    console.log(noteId, userId);
    throw new Error('Method findByIdAndUser() must be implemented');
  }

  /**
   * Найти все заметки определённого типа у пользователя
   * @param {number} userId
   * @param {string} type
   * @returns {Promise<Array>}
   */
  async findByType(userId, type) {
    console.log(userId, type);
    throw new Error('Method findByType() must be implemented');
  }

  /**
   * Поиск по заголовку и содержимому
   * @param {string|number} userId
   * @param {string|number} fileId
   * @param {string} cleanedTitle
   * @returns {Promise<Array>}
   */
  async searchNote(userId, fileId, cleanedTitle) {
    console.log(userId, fileId, cleanedTitle);
    throw new Error('Method searchNote() must be implemented');
  }
  /** 
    * Найти заметку по ID
    * @param {number} noteId
    * @returns {Promise<Object>}
  */

  async findById(noteId){
    console.log(noteId);
    throw new Error('Method findById() must be implemented');
  }
  /**
   * Удаление заметки
   * @param {Object} note 
   */
  async delete(note) {
    console.log(note);
    throw new Error('Method delete() must be implemented');
  }

  /**
   * Получить уникальные типы заметок пользователя
   * @returns {Promise<Array>}
   * @throws {Error} Если метод не реализован
   */
  async getUniqueTypes() {
    throw new Error('Method getUniqueTypes() must be implemented');
  }

    /**
     * Создание заметки
     * @param {Object} noteData - Данные заметки
     * @returns {Promise<Object>} - Созданная заметка
     */
    async create(noteData) {
      console.log(noteData);
      throw new Error('Method create() must be implemented');
    }
}
