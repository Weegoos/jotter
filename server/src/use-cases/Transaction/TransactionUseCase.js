const USER_NOT_FOUND = 'USER_NOT_FOUND';
const TRANSACTION_NOT_FOUND = 'TRANSACTION_NOT_FOUND';
const CATEGORY_NOT_FOUND = 'CATEGORY_NOT_FOUND';

export class TransactionUseCase {
  constructor(transactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async execute(userId, amount, type, description, date, source, category_id) {
    if (!userId) {
      throw new Error(USER_NOT_FOUND);
    }

    if (!category_id) {
      throw new Error(CATEGORY_NOT_FOUND);
    }

    if (!amount || !type || !description || !date || !source) {
      throw new Error('All fields are required');
    }

    const transactionData = {
      userId,
      amount,
      type,
      description,
      date,
      source,
    };

    return await this.transactionRepository.create(transactionData, category_id);
  }

  async getTransaction(userId) {
    if (!userId) {
      throw new Error(USER_NOT_FOUND);
    }

    const transaction = await this.transactionRepository.findAll(userId);
    if (!transaction) {
      throw new Error(TRANSACTION_NOT_FOUND);
    }
    return transaction;
  }

  async getTransactionById(userId, transactionId) {
    if (!userId) {
      throw new Error(USER_NOT_FOUND);
    }

    if (!transactionId) {
      throw new Error(TRANSACTION_NOT_FOUND);
    }

    const transaction = await this.transactionRepository.findAllById(userId, transactionId);

    if (!transaction || (Array.isArray(transaction) && transaction.length === 0)) {
      throw new Error(TRANSACTION_NOT_FOUND);
    }

    return transaction;
  }

  async delete(transactionId, userId) {
    if (!userId) {
      throw new Error(USER_NOT_FOUND);
    }
    if (!transactionId) {
      throw new Error(TRANSACTION_NOT_FOUND);
    }

    const deletedTransaction = await this.transactionRepository.destroy(transactionId, userId);

    if (
      !deletedTransaction ||
      (Array.isArray(deletedTransaction) && deletedTransaction.length === 0)
    ) {
      throw new Error(TRANSACTION_NOT_FOUND);
    }
    return deletedTransaction;
  }
}
