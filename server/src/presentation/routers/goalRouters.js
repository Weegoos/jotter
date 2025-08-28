import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { SequelizeGoalRepository } from '../../infrastructure/repositories/GoalRepositories.js';
import Goals from '../../infrastructure/database/models/goalSchemas.js';
import { GoalUseCase } from '../../use-cases/Goal/GoalUseCase.js';
import { GoalController } from '../controllers/goal/GoalController.js';
import Transaction from '../../infrastructure/database/models/transactionSchemas.js';

const router = express.Router();

// SOLID DI
const repository = new SequelizeGoalRepository(Goals, Transaction);
const useCase = new GoalUseCase(repository);
const controller = new GoalController(useCase);

router.post('/', authMiddleware, controller.createGoal.bind(controller));

router.get('/', authMiddleware, controller.findAllGoals.bind(controller));

router.patch('/:id', authMiddleware, controller.partialGoalUpdate.bind(controller));

router.delete('/:id', authMiddleware, controller.deleteGoal.bind(controller));

export default router;
