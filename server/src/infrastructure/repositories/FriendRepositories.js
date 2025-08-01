import { IFriendRepository } from '../../domain/repositories/IFriendRepository.js';

export class SequelizeFriendRepository extends IFriendRepository {
  constructor(friendModel, userModel) {
    super();
    this.friendModel = friendModel;
    this.userModel = userModel;
  }

  async findAll(whereConditions, orderConditions = {}) {
    try {
      return await this.friendModel.findAll({
        where: whereConditions,
        order: orderConditions,
      });
    } catch (error) {
      console.log('Ошибка при получении друзей:', error);
      throw new Error('Ошибка сервера');
    }
  }

  async findOneFromUser(whereConditions) {
    try {
      return await this.userModel.findOne({
        where: whereConditions,
      });
    } catch (error) {
      console.log('Ошибка при поиске пользователя:', error);
      throw new Error('Ошибка сервера');
    }
  }

  async findOneFromFriend(whereConditions) {
    try {
      return await this.friendModel.findOne({
        where: whereConditions,
      });
    } catch (error) {
      console.log('Ошибка при поиске друга:', error);
      throw new Error('Ошибка сервера');
    }
  }

  async create(friendData) {
    try {
      return await this.friendModel.create(friendData);
    } catch (error) {
      console.log('Ошибка при создании друга:', error);
      throw new Error('Ошибка сервера');
    }
  }
}
