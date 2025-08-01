import { Sequelize } from 'sequelize';

export class TypeUseCases {
  constructor(typeRepository) {
    this.typeRepository = typeRepository;
  }

  async getAllTypes() {
    const types = await this.typeRepository.findAll({}, {}, true);
    if (!types || types.length === 0) {
      throw new Error('No types found');
    }
    return types;
  }

  async getAllTypesUsedByUser(fileId) {
    if (!fileId) {
      throw new Error('fileId is required');
    }

    fileId = Number(fileId);

    if (isNaN(fileId)) {
      throw new Error('fileId must be a number');
    }

    const types = await this.typeRepository.findAll(
      [[Sequelize.fn('DISTINCT', Sequelize.col('type')), 'type']],
      { fileId },
      true
    );

    if (!types || types.length === 0) {
      throw new Error('No types found for the given fileId');
    }

    const uniqueTypes = types.map((t) => t.type);

    return uniqueTypes;
  }
}
