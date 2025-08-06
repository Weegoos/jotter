import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import './swagger/friendSwagger.js';
import { GetFriendController } from '../controllers/friend/getFriendControllers.js';
import { PostFriendControllers } from '../controllers/friend/postFriendControllers.js';
import { PutFriendController } from '../controllers/friend/putFriendControllers.js';
import { SequelizeFriendRepository } from '../../infrastructure/repositories/FriendRepositories.js';
import Friend from '../../infrastructure/database/models/friendSchemas.js';
import { FriendUseCase } from '../../use-cases/Friend/FriendUseCase.js';
import User from '../../infrastructure/database/models/userSchemas.js';
import { DeleteFriendController } from '../controllers/friend/deleteFriendControllers.js';
const router = express.Router();

// Di Solid
const friendRepository = new SequelizeFriendRepository(Friend, User);
const friendUseCase = new FriendUseCase(friendRepository);

// post
const postFriendControllers = new PostFriendControllers(friendUseCase);
router.post(
  '/add',
  authMiddleware,
  postFriendControllers.sendRequestToTheFriend.bind(postFriendControllers)
);

// get
const getFriendController = new GetFriendController(friendUseCase);
router.get('/getAll', authMiddleware, getFriendController.getAllFriends.bind(getFriendController));
router.get(
  '/getByStatus',
  authMiddleware,
  getFriendController.getFriendsByStatusController.bind(getFriendController)
);

// put
const putFriendController = new PutFriendController(friendUseCase);

router.put(
  '/changeStatus',
  authMiddleware,
  putFriendController.changeFriendStatus.bind(putFriendController)
);

// delete
const deleteFriendController = new DeleteFriendController(friendUseCase);
router.delete(
  '/deleteById',
  authMiddleware,
  deleteFriendController.deleteFriendById.bind(deleteFriendController)
);

export default router;
