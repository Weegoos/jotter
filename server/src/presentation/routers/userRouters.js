import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import './swagger/_userSwagger.js';
import {
  allUsersByInput,
  getAllUsers,
  getUserInfo,
} from '../controllers/user/getUserControllers.js';
import { loginUser, PostUserController } from '../controllers/user/postUserControllers.js';
import { editUserInfo } from '../controllers/user/editUserControllers.js';
import { SequelizeUserRepository } from '../../infrastructure/repositories/UserRepositories.js';
import User from '../../infrastructure/database/models/userSchemas.js';
import { UserUseCase } from '../../use-cases/User/UserUseCase.js';
const router = express.Router();

// DI Solid
const userRepository = new SequelizeUserRepository(User);

const userUseCase = new UserUseCase(userRepository);
const postUserController = new PostUserController(userUseCase);
router.post('/register', postUserController.createUser.bind(postUserController));
router.post('/login', loginUser);

router.put('/edit', authMiddleware, editUserInfo);

router.get('/me', authMiddleware, getUserInfo);
router.get('/allUsers', authMiddleware, getAllUsers);
router.get('/allUsersByInput', authMiddleware, allUsersByInput);

export default router;
