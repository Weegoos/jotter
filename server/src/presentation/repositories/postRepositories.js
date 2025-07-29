import { Op } from 'sequelize';
import Files from '../../infrastructure/database/models/fileSchemas.js';
import Notes from '../../infrastructure/database/models/notesSchemas.js';

export class PostRepository {
  constructor(database) {
    this.database = database;
  }

  async create(note) {
    try {
      console.log('Creating note with data:', note);
      const createdNote = await this.database.create(note);
      return createdNote;
    } catch (error) {
      console.error('Sequelize Validation Error:', error.errors);
      throw new Error('Error creating note: ' + error.message);
    }
  }

  async getAllByFilter(filter, userId, fileId) {
    return await Notes.findAll({
      where: filter,
      order: [
        ['updatedAt', 'DESC'],
        ['createdAt', 'DESC'],
      ],
      include: [
        {
          model: Files,
          attributes: [],
          where: { id: fileId, userId },
        },
      ],
    });
  }

  async findByIdAndUser(noteId, userId) {
    return await Notes.findOne({
      where: { id: noteId },
      include: [
        {
          model: Files,
          where: { userId },
          attributes: [],
        },
      ],
    });
  }

  async findByType(userId, type) {
    return await Notes.findAll({
      where: { type: type },
      include: [
        {
          model: Files,
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
    return await Notes.findAll({
      where: {
        fileId: fileId,
        [Op.or]: [
          { title: { [Op.like]: `%${cleanedTitle}%` } },
          { content: { [Op.like]: `%${cleanedTitle}%` } },
        ],
      },
      include: [
        {
          model: Files,
          where: { userId: userId },
          attributes: [],
        },
      ],
    });
  }
}
