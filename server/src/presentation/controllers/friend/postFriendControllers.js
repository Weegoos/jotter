import { wss } from '../../../server.js';
export class PostFriendControllers {
  constructor(friendUseCase) {
    this.friendUseCase = friendUseCase;
  }

  async sendRequestToTheFriend(req, res) {
    try {
      const userId = req.user?.id;
      const { fullname } = req.query;

      const newFriend = await this.friendUseCase.sendRequestToFriendUseCase(userId, fullname);

      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(
            JSON.stringify({
              event: 'new_friend',
              newFriend: newFriend,
            })
          );
        }
      });

      res.status(201).json({ message: 'Запрос отправлен пользователю', friend: newFriend });
    } catch (error) {
      if (error.message === 'Неавторизованный пользователь') {
        return res.status(401).json({ message: 'Неавторизованный пользователь' });
      }
      if (error.message === 'Параметр fullname обязателен') {
        return res.status(400).json({ message: 'Параметр fullname обязателен' });
      }
      if (error.message === 'Пользователь с таким именем не найден') {
        return res.status(404).json({ message: 'Пользователь с таким именем не найден' });
      }
      if (error.message === 'Нельзя добавить себя в друзья') {
        return res.status(400).json({ message: 'Нельзя добавить себя в друзья' });
      }
      if (error.message === 'Пользователь уже в друзьях или запрос отправлен') {
        return res.status(409).json({ message: 'Пользователь уже в друзьях или запрос отправлен' });
      }
      console.error('Ошибка при добавлении в друзья:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}
