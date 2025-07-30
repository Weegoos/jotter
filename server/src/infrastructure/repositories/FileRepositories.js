'use strict';
import { IFileRepository } from '../../domain/repositories/IFileRepository.js';

export class SequelizeFileRepository extends IFileRepository {
  constructor(fileModel) {
    super();
    this.fileModel = fileModel;
  }

  async findOne(fileId, userId) {
    return await this.fileModel.findOne({
      where: { id: fileId, userId },
    });
  }

  async create(fileData) {
    const createdFile = await this.fileModel.create({ ...fileData });
    return createdFile;
  }

  async findAll(userId) {
    return await this.fileModel.findAll({
      where: { userId: userId },
      order: [['createdAt', 'DESC']],
    });
  }
}
