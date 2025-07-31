import { Op } from 'sequelize';
import Files from '../../../infrastructure/database/models/fileSchemas.js';
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
        parseInt(page),
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
}

export const getFilesName = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ message: 'Ошибка: userId отсутствует.' });
    }

    const files = await Files.findAll({
      where: { userId: userId, status: 'active' },
      attributes: ['name'],
    });

    res.json(files.map((file) => file.name));
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const searchFiles = async (req, res) => {
  try {
    const id = req.user.id;
    const { search } = req.query;
    if (!id) {
      return res.status(400).json({ message: 'Ошибка: id отсутствует.' });
    }

    const file = await Files.findAll({
      where: {
        userId: id,
        name: {
          [Op.like]: `%${search}%`,
        },
      },
    });

    if (!file || file.length === 0) {
      return res.status(404).json({ message: 'Файлы не найдены' });
    }

    return res.status(200).json({
      message: 'Поиск файлов по имени',
      output: file,
    });
  } catch (error) {
    console.error('Ошибка при поиске файла:', error);
    res.status(500).json({ message: 'Ошибка при поиске файла' });
  }
};
