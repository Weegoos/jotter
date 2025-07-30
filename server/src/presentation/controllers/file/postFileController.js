import { wssSend } from '../wssSend.js';
export class CreateFileController {
  constructor(fileUseCases) {
    this.fileUseCases = fileUseCases;
  }

  async create(req, res) {
    try {
      const { name, description } = req.body;
      const userId = req.user.id;

      const newFile = await this.fileUseCases.createFile(name, description, userId, 'active');
      wssSend('create_file', { newFile });

      res.status(201).json({ message: 'Файл создан!', file: newFile });
    } catch (error) {
      if (error.message.includes('Name, userId, description are required')) {
        return res.status(400).json({ message: 'Name, userId, description are required' });
      }
      console.error('Ошибка при создании файла:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}
