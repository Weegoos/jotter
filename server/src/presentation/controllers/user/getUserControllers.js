import { Op } from 'sequelize';
import User from '../../../infrastructure/database/models/userSchemas.js';
export class GetUserController {
  constructor(userUseCase) {
    this.userUseCase = userUseCase;
  }

  async getUserInfo(req, res) {
    try {
      const user = await this.userUseCase.findByPk(req.user.id);

      res.json(user);
    } catch (error) {
      if (error.message === 'USER NOT FOUND') {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
      console.error('Ошибка при получении данных:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async getAllUsers(req, res) {
    try {
      const currentUserId = req.user?.id;

      const users = await this.userUseCase.findAll(currentUserId);

      res.status(200).json(users);
    } catch (error) {
      if (error.message === 'Current user ID is required') {
        return res.status(401).json({ message: 'Неавторизованный запрос' });
      }

      if (error.message === 'No users found') {
        return res.status(404).json({ message: 'Пользователи не найдены' });
      }
      console.error('Ошибка при получении данных:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}

export const allUsersByInput = async (req, res) => {
  try {
    const { fullname } = req.query;
    const currentUserId = req.user?.id;

    if (!fullname) {
      return res.status(400).json({ message: 'Параметр fullname обязателен' });
    }
    if (!currentUserId) {
      return res.status(401).json({ message: 'Неавторизованный запрос' });
    }

    const users = await User.findAll({
      where: {
        fullname: {
          [Op.iLike]: `%${fullname}%`,
        },
        id: {
          [Op.ne]: currentUserId, // исключаем текущего пользователя
        },
      },
    });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'Пользователи не найдены' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
