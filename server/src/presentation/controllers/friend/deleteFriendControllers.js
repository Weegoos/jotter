import { wssSend } from '../wssSend.js';
export class DeleteFriendController {
  constructor(friendUseCase) {
    this.friendUseCase = friendUseCase;
  }

  async deleteFriendById(req, res) {
    try {
      const userId = req.user?.id;
      const { friendId } = req.query;

      const friend = await this.friendUseCase.deleteFriendById(userId, friendId)
      wssSend('deleteFromFriend', {friend})

      res.status(200).json({ message: 'Друг успешно удален.' });
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
