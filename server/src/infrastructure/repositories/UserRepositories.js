import { IUserRepository } from '../../domain/repositories/IUserRepository.js';

export class SequelizeUserRepository extends IUserRepository {
  constructor(userDatabaseModel, OpModel) {
    super();
    this.userDatabaseModel = userDatabaseModel;
    this.OpModel = OpModel;
  }

  async findOne(parameter, parameterValue) {
    return await this.userDatabaseModel.findOne({
      where: {
        [parameter]: parameterValue,
      },
    });
  }

  async create(userFullname, userEmail, userPassword) {
    return await this.userDatabaseModel.create({
      fullname: userFullname,
      email: userEmail,
      password: userPassword,
    });
  }

  async findByPk(userId) {
    return await this.userDatabaseModel.findByPk(userId);
  }

  async findAll(userId) {
    return await this.userDatabaseModel.findAll({
      where: {
        id: {
          [this.OpModel.ne]: userId,
        },
      },
    });
  }
  async findAllByInput(fullname, currentUserId) {
    return await this.userDatabaseModel.findAll({
      where: {
        fullname: {
          [this.OpModel.iLike]: `%${fullname}%`,
        },
        id: {
          [this.OpModel.ne]: currentUserId, // исключаем текущего пользователя
        },
      },
    });
  }
}
