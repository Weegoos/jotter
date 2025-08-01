const USER_NOT_FOUND = 'USER_NOT_FOUND';

export class FriendUseCase {
  constructor(friendRepository) {
    this.friendRepository = friendRepository;
  }

  async getAllFriends(userId) {
    try {
      if (!userId) {
        throw new Error('Неавторизованный пользователь');
      }

      const friends = await this.friendRepository.findAll(
        {
          friendId: userId,
          status: 'accepted',
        },
        [['createdAt', 'DESC']]
      );

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

      const friends = await this.friendRepository.findAll(
        {
          friendId: userId,
          status: status,
        },
        [['createdAt', 'DESC']]
      );

      return friends;
    } catch (error) {
      console.error('Ошибка при получении друзей по статусу:', error);
      throw new Error('Ошибка сервера');
    }
  }

  async sendRequestToFriendUseCase(userId, fullname) {
    try {
      if (!userId) {
        throw new Error('Неавторизованный пользователь');
      }

      if (!fullname) {
        throw new Error('Параметр fullname обязателен');
      }

      const friendUser = await this.friendRepository.findOneFromUser({ fullname });
      const currentUser = await this.friendRepository.findOneFromUser({
        id: userId,
      });
      console.log(currentUser);

      if (!friendUser) {
        throw new Error('Пользователь с таким именем не найден');
      }

      const friendId = friendUser.id;

      if (parseInt(userId) === parseInt(friendId)) {
        throw new Error('Нельзя добавить себя в друзья');
      }

      const existingFriend = await this.friendRepository.findOneFromFriend({
        userId,
        friendId,
        fullname: friendUser.fullname,
      });

      if (existingFriend) {
        throw new Error('Пользователь уже в друзьях или запрос отправлен');
      }

      const friendData = {
        userId,
        friendId,
        fullname: currentUser.fullname,
        status: 'pending',
      };

      const newFriend = await this.friendRepository.create(friendData);

      return { message: 'Запрос отправлен пользователю', friend: newFriend };
    } catch (error) {
      console.error('Ошибка при добавлении в друзья:', error);
      throw new Error('Ошибка сервера');
    }
  }

  async changeFriendStatus(userId, status, friendId) {
    if (!userId) {
      throw new Error(USER_NOT_FOUND);
    }

    if (!friendId) {
      throw new Error('friendId is required');
    }

    if (!status) {
      throw new Error('status is required');
    }

    const friend = await this.friendRepository.findOneFromFriend({
      id: friendId,
      friendId: userId,
    });

    if (!friend) {
      throw new Error('Friendship not found');
    }

    friend.status = status;
    await friend.save;

    return friend;
  }

  async deleteFriendById(userId, friendId) {
    if (!userId) {
      throw new Error(USER_NOT_FOUND);
    }

    if (!friendId) {
      throw new Error('friendId is required');
    }

    const friend = await this.friendRepository.findOneFromFriend({
      id: friendId,
      friendId: userId,
    });

    if (!friend) {
      throw new Error('Friendship not found');
    }

    await friend.destroy();
    return friend;
  }
}
