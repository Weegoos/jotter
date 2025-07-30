import { Op } from 'sequelize';
import { INoteRepository } from '../../domain/repositories/INoteRepository.js';
export class SequelizeNoteRepository extends INoteRepository {
  constructor(noteModel, fileModel) {
    super();
    this.noteModel = noteModel;
    this.fileModel = fileModel;
  }

  async create(note) {
    try {
      const createdNote = await this.noteModel.create({ ...note });
      return createdNote;
    } catch (error) {
      console.error('Sequelize Validation Error:', error.errors);
      throw new Error('Error creating note: ' + error.message);
    }
  }

  async getAllByFilter(filter, userId, fileId) {
    return await this.noteModel.findAll({
      where: filter,
      order: [
        ['updatedAt', 'DESC'],
        ['createdAt', 'DESC'],
      ],
      include: [
        {
          model: this.fileModel,
          attributes: [],
          where: { id: fileId, userId },
        },
      ],
    });
  }

  async findByIdAndUser(noteId, userId) {
    return await this.noteModel.findOne({
      where: { id: noteId },
      include: [
        {
          model: this.fileModel,
          where: { userId },
          attributes: [],
        },
      ],
    });
  }

  async findByType(userId, type) {
    return await this.noteModel.findAll({
      where: { type: type },
      include: [
        {
          model: this.fileModel,
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
    return await this.noteModel.findAll({
      where: {
        fileId: fileId,
        [Op.or]: [
          { title: { [Op.like]: `%${cleanedTitle}%` } },
          { content: { [Op.like]: `%${cleanedTitle}%` } },
        ],
      },
      include: [
        {
          model: this.fileModel,
          where: { userId: userId },
          attributes: [],
        },
      ],
    });
  }

  async findById(noteId) {
    return this.noteModel.findByPk(noteId);
  }

  async delete(note) {
    return note.destroy();
  }

  async getUniqueTypes() {
    const types = await this.noteModel.findAll({
      attributes: ['type'],
      group: ['type'],
      raw: true,
    });

    return types.map((t) => t.type);
  }

  async findOne(noteId, userId) {
    return await this.noteModel.findOne({
      where: { id: noteId },
      include: [
        {
          model: this.fileModel,
          attributes: [],
          where: { userId: userId },
        },
      ],
    });
  }
}
