import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { GetHashtagConroller } from '../controllers/hashtags/getHashtags.js';
import { HashtagRepository } from '../../infrastructure/repositories/HashtagRepositories.js';
import Hashtags from '../../infrastructure/database/models/hashtagSchemas.js';
import { HashtagUseCase } from '../../use-cases/Hashtag/HashtagUseCase.js';

const router = express.Router();

// DI Solid
const hashtagRepository = new HashtagRepository(Hashtags);
const hashtagUseCase = new HashtagUseCase(hashtagRepository);
const getHashtagController = new GetHashtagConroller(hashtagUseCase);

router.get('/all', authMiddleware, getHashtagController.getAllHashtags.bind(getHashtagController));

export default router;
