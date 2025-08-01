import { IFriendRepository } from '../../domain/repositories/IFriendRepository.js';

export class SequelizeFriendRepository extends IFriendRepository {
  constructor(friendModel) {
    super();
    this.friendModel = friendModel;
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
}
