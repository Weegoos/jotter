import express from 'express';
import { SequelizeTransactionRepositories } from '../../infrastructure/repositories/TransactionRepositories.js';
import Transaction from '../../infrastructure/database/models/transactionSchemas.js';
import { TransactionUseCase } from '../../use-cases/Transaction/TransactionUseCase.js';
import { TransactionController } from '../controllers/transaction/TransactionController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import Categories from '../../infrastructure/database/models/categorySchemas.js';

const router = express.Router();

// DI Solid
const repository = new SequelizeTransactionRepositories(Transaction, Categories);
const useCase = new TransactionUseCase(repository);
const controller = new TransactionController(useCase);

router.post('/', authMiddleware, controller.createTransaction.bind(controller));

export default router;
