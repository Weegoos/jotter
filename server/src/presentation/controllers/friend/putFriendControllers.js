import { wss } from '../../../server.js';
export class PutFriendController {
  constructor(friendUseCase) {
    this.friendUseCase = friendUseCase;
  }

  async changeFriendStatus(req, res) {
    try {
      const userId = req.user?.id;
      const { status, friendId } = req.query;

      const friend = await this.friendUseCase.changeFriendStatus(userId, status, friendId);

      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({ event: 'changeFriendStatus', friend }));
        }
      });

      res.status(200).json({ message: 'Статус обновлён', friend });
    } catch (error) {
      if (error.message.includes('Friendship not found')) {
        return res.status(400).json({ message: 'Дружба не найдена' });
      }
      if (
        error.message.includes('status is required') ||
        error.message.includes('friendId is required')
      ) {
        return res.status(400).json({ message: 'status или friendId не найдены' });
      }
      console.error('Ошибка при изменении статуса друга:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}
