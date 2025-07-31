'use strict';
import { IFileRepository } from '../../domain/repositories/IFileRepository.js';

export class SequelizeFileRepository extends IFileRepository {
  constructor(fileModel, OpModels) {
    super();
    this.fileModel = fileModel;
    this.OpModels = OpModels;
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

  async findByName(userId, status, attributes = ['name']) {
    return await this.fileModel.findAll({
      where: { userId: userId, status: status },
      order: [['createdAt', 'DESC']],
      attributes: [attributes],
    });
  }

  async findAndCountAll(userId, status, limit, offset, pinned) {
    const whereClause = {
      userId,
      status,
    };

    if (typeof pinned !== 'undefined') {
      whereClause.pinned = pinned;
    }

    return await this.fileModel.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
  }

  async findAllByOp(userId, search) {
    return await this.fileModel.findAll({
      where: {
        userId: userId,
        name: {
          [this.OpModels.like]: `%${search}%`,
        },
      },
      order: [['createdAt', 'DESC']],
    });
  }
}
