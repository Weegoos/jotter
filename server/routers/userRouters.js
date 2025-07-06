import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import './swagger/_userSwagger.js';
import {
  allUsersByInput,
  getAllUsers,
  getUserInfo,
} from '../controllers/user/getUserControllers.js';
import { createUser, loginUser } from '../controllers/user/postUserControllers.js';
import { editUserInfo } from '../controllers/user/editUserControllers.js';
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);

router.put('/edit', authMiddleware, editUserInfo);

router.get('/me', authMiddleware, getUserInfo);
router.get('/allUsers', authMiddleware, getAllUsers);
router.get('/allUsersByInput', authMiddleware, allUsersByInput);

export default router;
