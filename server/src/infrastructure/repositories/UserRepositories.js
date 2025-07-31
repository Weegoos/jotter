import { IUserRepository } from '../../domain/repositories/IUserRepository.js';

export class SequelizeUserRepository extends IUserRepository {
  constructor(userDatabaseModel) {
    super();
    this.userDatabaseModel = userDatabaseModel;
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
}
