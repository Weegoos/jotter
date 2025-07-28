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
    // Найти заметку с привязкой к пользователю через файл
    const note = await this.postRepository.findByIdAndUser(noteId, userId);
    if (!note) {
      throw new Error('NOT_FOUND');
    }

    if (note.type === 'private') {
      if (!password) throw new Error('PASSWORD_REQUIRED');

      const isMatch = await bcrypt.compare(password, note.password);
      if (!isMatch) throw new Error('INVALID_PASSWORD');

      // Расшифровка
      note.content = decrypt(note.content);
      note.fileName = decrypt(note.fileName);
      note.title = decrypt(note.title);
    }

    return note;
  }
}
