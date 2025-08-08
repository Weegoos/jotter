import express from 'express';
import './swagger/taskSwagger.js';
import { SequelizeTasksRepositories } from '../../infrastructure/repositories/TasksRepositories.js';
import User from '../../infrastructure/database/models/userSchemas.js';
import { TaskUseCases } from '../../use-cases/Tasks/TaskUseCases.js';
import { TaskControllers } from '../controllers/tasks/TasksControllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import Tasks from '../../infrastructure/database/models/taskSchemas.js';

const router = express.Router();

// DI Solid
const taskRepository = new SequelizeTasksRepositories(Tasks, User);
const taskUseCase = new TaskUseCases(taskRepository);
const taskControllers = new TaskControllers(taskUseCase);

// post
router.post('/', authMiddleware, taskControllers.createTask.bind(taskControllers));

// get
router.get('/', authMiddleware, taskControllers.getAllTasks.bind(taskControllers));
router.get('/:taskId', authMiddleware, taskControllers.getTaskById.bind(taskControllers));

// patch
router.patch('/:taskId', authMiddleware, taskControllers.partialTaskUpdate.bind(taskControllers));

// put
router.put(
  '/:taskId',
  authMiddleware,
  taskControllers.completelyUpdateTheTask.bind(taskControllers)
);
export default router;
