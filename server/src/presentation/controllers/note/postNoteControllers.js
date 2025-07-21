
import { wss } from '../../../server.js';
import bcrypt from 'bcryptjs';
import { encrypt } from '../crypto.js';
import Files from '../../../infrastructure/database/models/fileSchemas.js';
import Notes from '../../../infrastructure/database/models/notesSchemas.js';

export class CreateNotesController {
  constructor(createNoteUseCase) {
    this.createNoteUseCase = createNoteUseCase;
  }

  async create(req, res) {
    try {
      const { title, content, fileName, type, password, hashtags } = req.body;

      if (!title || !content || !fileName || !type || !hashtags) {
        return res.status(400).json({ message: 'Все поля обязательны' });
      }

      if (!Array.isArray(hashtags)) {
        return res.status(400).json({ message: 'Hashtags должен быть массивом' });
      }

      const note = await this.createNoteUseCase.execute(fileName, title, content, type, password, hashtags);
      return res.status(201).json(note);
    } catch (error) {
      console.error('Ошибка создания заметки:', error);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}

