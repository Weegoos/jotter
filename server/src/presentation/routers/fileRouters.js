import express from 'express';

import './swagger/fileSwagger.js';
import {
  getFilesByStatus,
  getFilesByUserId,
  getFilesName,
  getTrashedFiles,
  searchFiles,
} from '../controllers/file/getFileControllers.js';
import { createFile } from '../controllers/file/postFileController.js';
import { editFileStatus, pinFile } from '../controllers/file/putFileControllers.js';
import { deleteAllFiles, deleteFileById } from '../controllers/file/deleteFileControllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/create', authMiddleware, createFile);

router.get('/search', authMiddleware, searchFiles);
router.get('/allFiles', authMiddleware, getFilesByUserId);
router.get('/filesName', authMiddleware, getFilesName);
router.get('/filesStatus', authMiddleware, getFilesByStatus);
router.get('/trashedFiles', authMiddleware, getTrashedFiles);

router.put('/editStatus', authMiddleware, editFileStatus);
router.put('/:fileId/pin', authMiddleware, pinFile);

router.delete('/deleteFile/:fileId', authMiddleware, deleteFileById);
router.delete('/deleteAll', authMiddleware, deleteAllFiles);
export default router;
