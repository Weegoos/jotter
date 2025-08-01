export class FriendUseCase {
  constructor(friendRepository) {
    this.friendRepository = friendRepository;
  }

  async getAllFriends(userId) {
    try {
      if (!userId) {
        throw new Error('Неавторизованный пользователь');
      }

      const friends = await this.friendRepository.findAll({ userId }, [['createdAt', 'DESC']]);
      return friends;
    } catch (error) {
      console.error('Ошибка при получении друзей:', error);
      throw new Error('Ошибка сервера');
    }
  }

  async getFriendsByStatus(userId, status) {
    try {
      if (!userId) {
        throw new Error('Неавторизованный пользователь');
      }

      if (!status) {
        throw new Error('Параметр status обязателен');
      }

      const friends = await this.friendRepository.findAll({ userId, status }, [
        ['createdAt', 'DESC'],
      ]);
      return friends;
    } catch (error) {
      console.error('Ошибка при получении друзей по статусу:', error);
      throw new Error('Ошибка сервера');
    }
  }
}
