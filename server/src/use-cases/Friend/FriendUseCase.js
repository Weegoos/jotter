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
}
