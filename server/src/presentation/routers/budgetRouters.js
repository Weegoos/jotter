import express from 'express';
import { SequelizeBudgetRepository } from '../../infrastructure/repositories/BudgetRepository.js';
import Budget from '../../infrastructure/database/models/budgetSchemas.js';
import Categories from '../../infrastructure/database/models/categorySchemas.js';
import { BudgetUseCase } from '../../use-cases/Budget/BudgetUseCase.js';
import { BudgetController } from '../controllers/budget/BudgetController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// SOLID DI
const repository = new SequelizeBudgetRepository(Budget, Categories);
const useCase = new BudgetUseCase(repository);
const controller = new BudgetController(useCase);

// POST
router.post('/', authMiddleware, controller.createBudget.bind(controller));

// GET
router.get('/', authMiddleware, controller.getAllBudgets.bind(controller));

// PATCH
router.patch('/:id', authMiddleware, controller.partialUpdateBudget.bind(controller));

export default router;
