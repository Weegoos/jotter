import express from 'express';
import Types from '../../../infrastructure/database/models/typeSchemas.js';
import { wssSend } from '../wssSend.js';

const router = express.Router();

export class GetTypeController {
  constructor(typeUseCase) {
    this.typeUseCase = typeUseCase;
  }

  async getAllTypes(res) {
    try {
      const types = await this.typeUseCase.getAllTypes();
      res.json(types);
    } catch (error) {
      if (error.message === 'No types found') {
        return res.status(404).json({ message: 'Типы не найдены' });
      }
      console.error('Ошибка:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async getAllTypeUsedByUser(req, res) {
    try {
      let { fileId } = req.params;
      const uniqueTypes = await this.typeUseCase.getAllTypesUsedByUser(fileId);

      wssSend('types_userUsed', {
        types: uniqueTypes,
      });

      res.json(uniqueTypes);
    } catch (error) {
      if (error.message === 'fileId is required' || error.message === 'fileId must be a number') {
        return res.status(400).json({ message: error.message });
      }
      if (error.message === 'No types found for the given fileId') {
        return res.status(404).json({ message: 'Типы не найдены для данного fileId' });
      }
      console.error('Ошибка:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}

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
