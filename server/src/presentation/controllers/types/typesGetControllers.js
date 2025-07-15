import express from 'express';
import Types from '../../../infrastructure/database/models/typeSchemas.js';
import Notes from '../../../infrastructure/database/models/notesSchemas.js';
import { wss } from '../../server.js';
import { Sequelize } from 'sequelize';

const router = express.Router();

export const getAllTypes = async (req, res) => {
  try {
    const types = await Types.findAll();
    res.json(types);
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const getAllTypeUsedByUser = async (req, res) => {
  try {
    console.log(req.params); // Посмотреть, что приходит в параметры

    let { fileId } = req.params;

    if (!fileId) {
      return res.status(400).json({ message: 'Ошибка: fileId отсутствует.' });
    }

    // Преобразуем fileId в число
    fileId = Number(fileId);

    // Если fileId не число, возвращаем ошибку
    if (isNaN(fileId)) {
      return res.status(400).json({ message: 'Ошибка: fileId должен быть числом.' });
    }

    // Находим уникальные типы заметок по fileId
    const types = await Notes.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('type')), 'type']],
      where: { fileId },
      raw: true,
    });

    const uniqueTypes = types.map((t) => t.type);

    // Отправляем типы по WebSocket
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ event: 'types_userUsed', types: uniqueTypes }));
      }
    });

    res.json(uniqueTypes);
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const getAllGeneralTypes = async (req, res) => {
  try {
    const generalTypes = await Types.findAll({
      where: { description: 'general' },
    });

    res.json(generalTypes);
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const getAllContentTypes = async (req, res) => {
  try {
    const generalTypes = await Types.findAll({
      where: { description: 'content' },
    });

    res.json(generalTypes);
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const getAllAccessLevelTypes = async (req, res) => {
  try {
    const generalTypes = await Types.findAll({
      where: { description: 'content' },
    });

    res.json(generalTypes);
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export default router;
