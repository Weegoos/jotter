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
}
