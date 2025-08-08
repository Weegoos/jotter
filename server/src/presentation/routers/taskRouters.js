import express from 'express';
import './swagger/taskSwagger.js';
import { SequelizeTasksRepositories } from '../../infrastructure/repositories/TasksRepositories.js';
import User from '../../infrastructure/database/models/userSchemas.js';
import { TaskUseCases } from '../../use-cases/Tasks/TaskUseCases.js';
import { TaskControllers } from '../controllers/tasks/TasksControllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import Tasks from '../../infrastructure/database/models/taskSchemas.js';
import { Op } from 'sequelize';

const router = express.Router();

// DI Solid
const taskRepository = new SequelizeTasksRepositories(Tasks, User, Op);
const taskUseCase = new TaskUseCases(taskRepository);
const taskControllers = new TaskControllers(taskUseCase);

// post
router.post('/', authMiddleware, taskControllers.createTask.bind(taskControllers));

// get
router.get('/', authMiddleware, taskControllers.getAllTasks.bind(taskControllers));
router.get('/calendar-view', authMiddleware, taskControllers.getCalendarView.bind(taskControllers));
router.get('/summary', authMiddleware, taskControllers.getTaskSummary.bind(taskControllers));
router.get('/:taskId', authMiddleware, taskControllers.getTaskById.bind(taskControllers));

// patch
router.patch('/:taskId', authMiddleware, taskControllers.partialTaskUpdate.bind(taskControllers));
router.patch(
  '/:taskId/status',
  authMiddleware,
  taskControllers.updateTaskStatus.bind(taskControllers)
);
router.patch(
  '/:taskId/priority',
  authMiddleware,
  taskControllers.updateTaskPriority.bind(taskControllers)
);

// put
router.put(
  '/:taskId',
  authMiddleware,
  taskControllers.completelyUpdateTheTask.bind(taskControllers)
);

// delete
router.delete('/:taskId', authMiddleware, taskControllers.destroyTaskById.bind(taskControllers));
export default router;
