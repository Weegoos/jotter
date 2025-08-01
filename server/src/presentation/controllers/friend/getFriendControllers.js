import Friend from '../../../infrastructure/database/models/friendSchemas.js';
import { wss } from '../../../server.js';
export class GetFriendController {
  constructor(friendUseCase) {
    this.friendUseCase = friendUseCase;
  }

  async getAllFriends(req, res) {
    try {
      const userId = req.user?.id;

      const friends = await this.friendUseCase.getAllFriends(userId);
      res.status(200).json({ friends });
    } catch (error) {
      console.error('Ошибка при получении друзей:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}

export const getUserByStatus = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { status } = req.query;

    if (!userId) {
      return res.status(401).json({ message: 'Неавторизованный пользователь' });
    }

    if (!status) {
      return res.status(400).json({ message: 'Параметр status обязателен' });
    }
    const friends = await Friend.findAll({
      where: {
        userId,
        status,
      },
    });

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ event: 'allFriendsByStatus', friends }));
      }
    });

    res.status(200).json({ friends });
  } catch (error) {
    console.error('Ошибка при добавлении в друзья:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
