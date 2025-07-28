import bcrypt from 'bcryptjs';
import { encrypt } from '../crypto.js';
import Files from '../../../infrastructure/database/models/fileSchemas.js';
import { wssSend } from '../wssSend.js';

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

      const file = await Files.findOne({ where: { name: fileName } });
      if (!file) {
        return res.status(404).json({ message: 'Файл не найден' });
      }

      const note = await this.createNoteUseCase.execute(
        type === 'private' ? encrypt(fileName) : fileName,
        type === 'private' ? encrypt(title) : title,
        type === 'private' ? encrypt(content) : content,
        type,
        type === 'private' ? await bcrypt.hash(password, 15) : password,
        hashtags,
        file.id
      );

      if (!note) {
        return res.status(500).json({ message: 'Не удалось создать заметку' });
      }
      wssSend('create_note', note);
      return res.status(201).json(note);
    } catch (error) {
      console.error('Ошибка создания заметки:', error);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}
