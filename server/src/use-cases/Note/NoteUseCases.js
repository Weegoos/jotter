import bcrypt from 'bcryptjs';
import { Note } from '../../entities/Note.js';
import { decrypt } from '../../presentation/controllers/crypto.js';

export class CreateNote {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  execute(fileName, title, content, type, password, hashtags, fileId) {
    const post = new Note(fileName, title, content, type, password, hashtags, fileId);
    return this.postRepository.create(post);
  }
}

export class GetNote {
  constructor(postRepository, fileRepository) {
    this.postRepository = postRepository;
    this.fileRepository = fileRepository;
  }

  async getAllByFileId(fileId, pinned, userId) {
    const filter = { fileId, pinned };
    return await this.postRepository.getAllByFilter(filter, userId, fileId);
  }

  async execute(noteId, userId, password = null) {
    const note = await this.postRepository.findByIdAndUser(noteId, userId);
    if (!note) {
      throw new Error('NOT_FOUND');
    }

    if (note.type === 'private') {
      if (!password) throw new Error('PASSWORD_REQUIRED');

      const isMatch = await bcrypt.compare(password, note.password);
      if (!isMatch) throw new Error('INVALID_PASSWORD');

      note.content = decrypt(note.content);
      note.fileName = decrypt(note.fileName);
      note.title = decrypt(note.title);
    }

    return note;
  }

  async getByType(userId, type) {
    const notes = await this.postRepository.findByType(userId, type);

    if (!notes) {
      throw new Error('NOT_FOUND');
    }
    return notes;
  }

  async searchNotes(userId, fileId, cleanedTitle) {
    const notes = await this.postRepository.searchNote(userId, fileId, cleanedTitle);
    if (!notes) {
      throw new Error('NOT_FOUND');
    }
    return notes;
  }
}

export class DeleteNote {
  constructor(database) {
    this.database = database;
  }

  async execute(noteId) {
    const note = await this.database.findById(noteId);
    if (!note) {
      throw new Error('Note not found');
    }

    await this.database.delete(note);
    const uniqueTypes = await this.database.getUniqueTypes();

    return { note, uniqueTypes };
  }
}