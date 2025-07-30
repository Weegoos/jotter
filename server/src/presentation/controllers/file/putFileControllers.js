import { wssSend } from '../wssSend.js';

export class EditFileStatusController {
  constructor(fileRepository) {
    this.fileRepository = fileRepository;
  }

  async edit(req, res) {
    try {
      const userId = req.user?.id;
      const { fileId, status } = req.query;

      if (!userId || !fileId || !status) {
        return res.status(400).json({ message: 'Необходимы userId, fileId и status' });
      }

      const file = await this.fileRepository.saveNote(fileId, userId, status);
      wssSend('change_status', {
        file: file,
      });

      res.json({ message: 'Статус обновлен', file });
    } catch (error) {
      console.error('Ошибка:', error);
      if (error.message.includes('FILE NOT FOUND')) {
        return res.status(404).json({ message: 'Файл не найден или доступ запрещен' });
      }
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}
export class PinFileController {
  constructor(fileRepository) {
    this.fileRepository = fileRepository;
  }

  async pin(req, res) {
    try {
      const { id } = req.user;
      const { fileId } = req.params;
      const { value } = req.body;

      const file = await this.fileRepository.pinFile(fileId, id, value);
      wssSend('change_status', {
        file: file,
      });

      return res.json({ message: 'Pinned обновился', file });
    } catch (error) {
      if (error.message.includes('FILE NOT FOUND')) {
        return res.status(404).json({ message: 'Файл не найден или доступ запрещен' });
      }
      if (error.message.includes('Value is required')) {
        return res.status(400).json({ message: 'Все поля обязательны' });
      }
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}
