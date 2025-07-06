import Friend from '../../schemas/friendSchemas';
import { wss } from '../../server';

export const deleteFriendById = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { friendId } = req.query;

    if (!friendId) {
      return res.status(400).json({ message: 'Параметр friendId обязателен' });
    }

    const friend = await Friend.findOne({
      where: {
        userId,
        friendId,
      },
    });

    if (!friend) {
      return res.status(404).json({ message: 'Друг не найден.' });
    }

    await friend.destroy();

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ event: 'deleteFromFriend', friend }));
      }
    });

    res.status(200).json({ message: 'Друг успешно удален.' });
  } catch (error) {
    console.error('Ошибка при изменении статуса друга:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
