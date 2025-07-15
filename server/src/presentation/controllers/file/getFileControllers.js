import { Op } from 'sequelize';
import Files from '../../../infrastructure/database/models/fileSchemas.js';
import { wss } from '../../../server.js';

export const getFilesByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ message: 'Ошибка: userId отсутствует.' });
    }
    const files = await Files.findAll({ where: { userId } });

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ event: 'get_files', userId, files }));
      }
    });
    res.json(files);
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const getFilesByStatus = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { status, pinned } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (!userId) {
      return res.status(400).json({ message: 'Ошибка: userId отсутствует.' });
    }

    if (!status || !pinned) {
      return res.status(400).json({ message: 'Ошибка: статус и pinned обязателен.' });
    }

    // Найдем файлы с учетом пагинации
    const offset = (page - 1) * limit;

    const files = await Files.findAndCountAll({
      where: { userId, status, pinned },
      limit: limit,
      offset: offset,
    });

    const totalPages = Math.ceil(files.count / limit);

    wss.clients.forEach((client) => {
      if (client.readyState === 1 && client.userId === userId) {
        client.send(
          JSON.stringify({
            event: 'get_files_by_status',
            files: files.rows,
            totalCount: files.count,
            totalPages,
            currentPage: page,
          })
        );
      }
    });

    res.json({
      files: files.rows,
      totalCount: files.count,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const getTrashedFiles = async (req, res) => {
  try {
    const { id } = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (!id) {
      return res.status(400).json({ message: 'Ошибка: id отсутствует.' });
    }

    const offset = (page - 1) * limit;

    const files = await Files.findAndCountAll({
      where: { userId: id, status: 'trashed' },
      limit: limit,
      offset: offset,
    });

    const totalPages = Math.ceil(files.count / limit);

    console.log(id);

    res.json({
      files: files.rows,
      totalCount: files.count,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

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
