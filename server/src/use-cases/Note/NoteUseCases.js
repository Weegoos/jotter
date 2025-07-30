import bcrypt from 'bcryptjs';
import { decrypt } from '../../presentation/controllers/crypto.js';

export class CreateNote {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute(fileName, title, content, type, password, hashtags, fileId) {
    const noteData = {
      fileName,
      title,
      content,
      type,
      password,
      hashtags,
      fileId,
    };

    return await this.postRepository.create(noteData);
  }
}

export class GetNote {
  constructor(noteRepository, fileRepository) {
    this.noteRepository = noteRepository;
    this.fileRepository = fileRepository;
  }

  async getAllByFileId(fileId, pinned, userId) {
    const filter = { fileId, pinned };
    return await this.noteRepository.getAllByFilter(filter, userId, fileId);
  }

  async execute(noteId, userId, password = null) {
    const note = await this.noteRepository.findByIdAndUser(noteId, userId);
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
    const notes = await this.noteRepository.findByType(userId, type);

    if (!notes) {
      throw new Error('NOT_FOUND');
    }
    return notes;
  }

  async searchNotes(userId, fileId, cleanedTitle) {
    const notes = await this.noteRepository.searchNote(userId, fileId, cleanedTitle);
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

export class UpdateNote {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute(noteId, content, title, type, userId) {
    const note = await this.noteRepository.findOne(noteId, userId);
    if (!note) {
      throw new Error('Note not found');
    }

    note.content = content;
    note.title = title;
    note.type = type;

    await note.save();
    return note;
  }

  async pinNote(noteId, value, userId) {
    const note = await this.noteRepository.findOne(noteId, userId);
    if (!note) {
      throw new Error('Note not found');
    }

    note.pinned = value;
    await note.save();
    return note;
  }
}
