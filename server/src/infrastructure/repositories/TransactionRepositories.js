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

  async findAll(userId) {
    return await this.transactionModel.findAll({
      where: { userId: userId },
    });
  }

  async findAllById(userId, transaction_id) {
    return await this.transactionModel.findAll({
      where: { userId: userId, id: transaction_id },
    });
  }

  async destroy(transactionId, userId) {
    const transaction = this.transactionModel.destroy({
      where: { userId: userId, id: transactionId },
    });

    if (!transaction) {
      throw new Error('TRANSACTION_NOT_FOUND');
    }

    return transaction;
  }
}
