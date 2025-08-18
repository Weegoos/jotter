import express from 'express';
import './swagger/categorySwagger.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { SequelizeCategory } from '../../infrastructure/repositories/CategoryRepositories.js';
import Categories from '../../infrastructure/database/models/categorySchemas.js';
import { CategoryUseCase } from '../../use-cases/Category/CategoryUseCase.js';
import { CategoryController } from '../controllers/category/CategoryController.js';

const router = express.Router();

// DI SOLID
const categoryRepositories = new SequelizeCategory(Categories);
const categoryUseCase = new CategoryUseCase(categoryRepositories);
const categoryController = new CategoryController(categoryUseCase);

router.post('/', authMiddleware, categoryController.createCategory.bind(categoryController));

router.get('/', authMiddleware, categoryController.findAllCategories.bind(categoryController));

export default router;
