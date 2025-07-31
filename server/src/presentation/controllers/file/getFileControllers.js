import { wssSend } from '../wssSend.js';
export class GetFileController {
  constructor(fileUseCases) {
    this.fileUseCases = fileUseCases;
  }

  async getFilesByUserId(req, res) {
    try {
      const userId = req.user.id;
      const files = await this.fileUseCases.findAllUserFiles(userId);
      console.log(files);

      wssSend('getFilesByUserId', { userId, files });

      res.json(files);
    } catch (error) {
      if (error.message.includes('USER NOT FOUND')) {
        return res.status(404).json({ message: 'Пользователь не найден.' });
      }
      console.error('Ошибка:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async getFilesByStatus(req, res) {
    try {
      const userId = req.user?.id;
      const { status, pinned } = req.query;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const { files, totalPages } = await this.fileUseCases.findFilesByStatus(
        userId,
        status,
        parseInt(limit),
        parseInt(page),
        pinned
      );

      wssSend('get_files_by_status', {
        files: files.rows,
        totalCount: files.count,
        totalPages,
        currentPage: page,
      });

      res.json({
        files: files.rows,
        totalCount: files.count,
        totalPages: totalPages,
        currentPage: page,
      });
    } catch (error) {
      if (error.message.includes('USER NOT FOUND')) {
        return res.status(400).json({ message: 'Ошибка: userId отсутствует.' });
      }

      if (error.message.includes('Status is required and must be a string')) {
        return res.status(400).json({ message: 'Ошибка: статус обязателен.' });
      }
      console.error('Ошибка:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
  async getTrashedFiles(req, res) {
    try {
      const { id } = req.user;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const { files, totalPages } = await this.fileUseCases.findFilesByStatus(
        id,
        'trashed',
        parseInt(limit),
        parseInt(page)
      );

      res.json({
        files: files.rows,
        totalCount: files.count,
        totalPages: totalPages,
        currentPage: page,
      });
    } catch (error) {
      console.error('Ошибка:', error);
      if (error.message.includes('USER NOT FOUND')) {
        return res.status(400).json({ message: 'Ошибка: userId отсутствует.' });
      }

      if (error.message.includes('Status is required and must be a string')) {
        return res.status(400).json({ message: 'Ошибка: статус обязателен.' });
      }
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async getFilesName(req, res) {
    try {
      const userId = req.user.id;
      const files = await this.fileUseCases.getFilesByName(userId, 'active', 'name');
      res.json(files.map((file) => file.name));
    } catch (error) {
      console.error('Ошибка:', error);
      if (error.message.includes('USER NOT FOUND')) {
        return res.status(400).json({ message: 'Ошибка: userId отсутствует.' });
      }
      if (error.message.includes('Status is required')) {
        return res.status(400).json({ message: 'Ошибка: статус обязателен.' });
      }
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async searchFiles(req, res) {
    try {
      const id = req.user.id;
      const { search } = req.query;

      const file = await this.fileUseCases.searchFiles(id, search);

      return res.status(200).json({
        message: 'Поиск файлов по имени',
        output: file,
      });
    } catch (error) {
      console.error('Ошибка при поиске файла:', error);

      if (error.message.includes('USER NOT FOUND')) {
        return res.status(400).json({ message: 'Ошибка: userId отсутствует.' });
      }
      if (error.message.includes('Search term is required')) {
        return res.status(400).json({ message: 'Ошибка: поисковый запрос обязателен.' });
      }
      if (error.message.includes('FILE NOT FOUND')) {
        return res.status(404).json({ message: 'Файл не найден.' });
      }
      res.status(500).json({ message: 'Ошибка при поиске файла' });
    }
  }
}
