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

  async getAllByFilter(filter) {
    return await Notes.findAll({
      where: filter,
      order: [
        ['updatedAt', 'DESC'],
        ['createdAt', 'DESC'],
      ],
    });
  }
}
