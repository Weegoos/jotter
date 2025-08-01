import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import './swagger/_userSwagger.js';
import { GetUserController } from '../controllers/user/getUserControllers.js';
import { PostUserController } from '../controllers/user/postUserControllers.js';
import { PutUserController } from '../controllers/user/editUserControllers.js';
import { SequelizeUserRepository } from '../../infrastructure/repositories/UserRepositories.js';
import User from '../../infrastructure/database/models/userSchemas.js';
import { UserUseCase } from '../../use-cases/User/UserUseCases.js';
import { Op } from 'sequelize';
const router = express.Router();

// DI Solid
const userRepository = new SequelizeUserRepository(User, Op);

const userUseCase = new UserUseCase(userRepository);
const postUserController = new PostUserController(userUseCase);
// post
router.post('/register', postUserController.createUser.bind(postUserController));
router.post('/login', postUserController.loginUser.bind(postUserController));

// put
const putUserController = new PutUserController(userUseCase);
router.put('/edit', authMiddleware, putUserController.editUserInfo.bind(putUserController));

// get
const getUserController = new GetUserController(userUseCase);
router.get('/me', authMiddleware, getUserController.getUserInfo.bind(getUserController));
router.get('/allUsers', authMiddleware, getUserController.getAllUsers.bind(getUserController));
router.get(
  '/allUsersByInput',
  authMiddleware,
  getUserController.getAllUsersByInput.bind(getUserController)
);

export default router;
