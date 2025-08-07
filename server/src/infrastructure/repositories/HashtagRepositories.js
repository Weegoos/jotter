import { IHashtagRepository } from '../../domain/repositories/IHashtagRepository.js';

export class HashtagRepository extends IHashtagRepository {
  constructor(hashtagModel, noteModel, fileModel) {
    super();
    this.hashtagModel = hashtagModel;
    this.noteModel = noteModel;
    this.fileModel = fileModel;
  }

  async findAll(whereCondition = {}, orderCondition = []) {
    return await this.hashtagModel.findAll({
      where: whereCondition,
      order: orderCondition,
    });
  }

  async findAllHashtags(whereCondition = {}, orderCondition = [], fileId) {
    return await this.hashtagModel.findAll({
      where: whereCondition,
      order: orderCondition,
      include: [
        {
          model: this.noteModel,
          include: [
            {
              model: this.fileModel,
              where: { id: fileId }, // здесь ID нужного файла
            },
          ],
        },
      ],
    });
  }
}
