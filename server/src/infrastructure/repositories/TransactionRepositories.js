import { ITransactionRepository } from '../../domain/repositories/ITransactionRepository.js';

export class SequelizeTransactionRepositories extends ITransactionRepository {
  constructor(transactionModel, categoryModel) {
    super();
    this.transactionModel = transactionModel;
    this.categoryModel = categoryModel;
  }

  async create(transactionData, category_id) {
    const category = await this.categoryModel.findByPk(category_id);

    if (!category) {
      throw new Error(`CATEGORY_NOT_FOUND`);
    }

    const newTransaction = await this.transactionModel.create({
      ...transactionData,
      category_id: category.id,
    });

    return newTransaction;
  }
}
