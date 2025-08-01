import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import './swagger/friendSwagger.js';
import { GetFriendController } from '../controllers/friend/getFriendControllers.js';
import { sendRequestToTheFriend } from '../controllers/friend/postFriendControllers.js';
import { changeFriendStatus } from '../controllers/friend/putFriendControllers.js';
import { SequelizeFriendRepository } from '../../infrastructure/repositories/FriendRepositories.js';
import Friend from '../../infrastructure/database/models/friendSchemas.js';
import { FriendUseCase } from '../../use-cases/Friend/FriendUseCase.js';
// import { deleteFileById } from '../controllers/file/deleteFileControllers.js';
const router = express.Router();

// Di Solid
const friendRepository = new SequelizeFriendRepository(Friend);
const friendUseCase = new FriendUseCase(friendRepository);
router.post('/add', authMiddleware, sendRequestToTheFriend);

// get
const getFriendController = new GetFriendController(friendUseCase);
router.get('/getAll', authMiddleware, getFriendController.getAllFriends.bind(getFriendController));
router.get(
  '/getByStatus',
  authMiddleware,
  getFriendController.getFriendsByStatusController.bind(getFriendController)
);

router.put('/changeStatus', authMiddleware, changeFriendStatus);

// router.delete('/deleteById', authMiddleware, deleteFileById);

export default router;
