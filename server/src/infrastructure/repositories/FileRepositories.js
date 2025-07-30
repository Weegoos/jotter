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

  async findAndCountAll(userId, status, limit, offset, pinned) {
    return await this.fileModel.findAndCountAll({
      where: { userId: userId, status: status, pinned: pinned },
      limit: limit,
      offset: offset,
      order: [['createdAt', 'DESC']],
    });
  }
}
