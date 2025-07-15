import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getAllHashtags } from '../controllers/hashtags/getHashtags.js';

const router = express.Router();

router.get('/all', authMiddleware, getAllHashtags);

export default router;
