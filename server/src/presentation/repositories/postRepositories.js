import { Op } from 'sequelize';
import { INoteRepository } from './INoteRepository.js';
// import Files from '../../infrastructure/database/models/fileSchemas.js';
// import Notes from '../../infrastructure/database/models/notesSchemas.js';

export class PostRepository {
  constructor(database) {
    this.database = database;
  }

  async create(note) {
    try {
      const createdNote = await this.database.create({ ...note });
      return createdNote;
    } catch (error) {
      console.error('Sequelize Validation Error:', error.errors);
      throw new Error('Error creating note: ' + error.message);
    }
  }
}
export class GetRepository extends INoteRepository {
  constructor(database, fileDatabase) {
    super();
    this.database = database;
    this.fileDatabase = fileDatabase;
  }

  async getAllByFilter(filter, userId, fileId) {
    return await this.database.findAll({
      where: filter,
      order: [
        ['updatedAt', 'DESC'],
        ['createdAt', 'DESC'],
      ],
      include: [
        {
          model: this.fileDatabase,
          attributes: [],
          where: { id: fileId, userId },
        },
      ],
    });
  }

  async findByIdAndUser(noteId, userId) {
    return await this.database.findOne({
      where: { id: noteId },
      include: [
        {
          model: this.fileDatabase,
          where: { userId },
          attributes: [],
        },
      ],
    });
  }

  async findByType(userId, type) {
    return await this.database.findAll({
      where: { type: type },
      include: [
        {
          model: this.fileDatabase,
          where: { userId: userId },
          attributes: [],
        },
      ],
      order: [
        ['updatedAt', 'DESC'],
        ['createdAt', 'DESC'],
      ],
    });
  }
  async searchNote(userId, fileId, cleanedTitle) {
    return await this.database.findAll({
      where: {
        fileId: fileId,
        [Op.or]: [
          { title: { [Op.like]: `%${cleanedTitle}%` } },
          { content: { [Op.like]: `%${cleanedTitle}%` } },
        ],
      },
      include: [
        {
          model: this.fileDatabase,
          where: { userId: userId },
          attributes: [],
        },
      ],
    });
  }
}

export class DeleteRepository {
  constructor(database) {
    this.database = database;
  }

  async findById(noteId) {
    return this.database.findByPk(noteId);
  }

  async delete(note) {
    return note.destroy();
  }

  async getUniqueTypes() {
    const types = await this.database.findAll({
      attributes: ['type'],
      group: ['type'],
      raw: true,
    });

    return types.map((t) => t.type);
  }
}
