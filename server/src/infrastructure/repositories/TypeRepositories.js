import { IHashtagRepository } from '../../domain/repositories/IHashtagRepository.js';

export class TypeRepository extends IHashtagRepository {
  constructor(typeModel, noteModel) {
    super();
    this.typeModel = typeModel;
    this.noteModel = noteModel;
  }

  async findAllFromType(
    userAttributes = {},
    whereCondition = {},
    userRaw = true,
    sequelizeCondition = {}
  ) {
    return await this.typeModel.findAll({
      attributes: userAttributes || sequelizeCondition,
      where: whereCondition,
      raw: userRaw,
    });
  }

  async findAllFromNote(
    userAttributes = {},
    whereCondition = {},
    userRaw = true,
    sequelizeCondition = {}
  ) {
    return await this.noteModel.findAll({
      attributes: userAttributes || sequelizeCondition,
      where: whereCondition,
      raw: userRaw,
    });
  }
}
