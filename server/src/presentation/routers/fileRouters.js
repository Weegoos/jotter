import express from 'express';

import './swagger/fileSwagger.js';
import {
  getFilesByStatus,
  getFilesByUserId,
  getFilesName,
  getTrashedFiles,
  searchFiles,
} from '../controllers/file/getFileControllers.js';
import { CreateFileController } from '../controllers/file/postFileController.js';
import {
  EditFileStatusController,
  PinFileController,
} from '../controllers/file/putFileControllers.js';
import { deleteAllFiles, deleteFileById } from '../controllers/file/deleteFileControllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { SequelizeFileRepository } from '../../infrastructure/repositories/FileRepositories.js';
import Files from '../../infrastructure/database/models/fileSchemas.js';
import { FileUseCases } from '../../use-cases/File/FileUseCases.js';
const router = express.Router();

router.get('/search', authMiddleware, searchFiles);
router.get('/allFiles', authMiddleware, getFilesByUserId);
router.get('/filesName', authMiddleware, getFilesName);
router.get('/filesStatus', authMiddleware, getFilesByStatus);
router.get('/trashedFiles', authMiddleware, getTrashedFiles);

// DI Solid
const fileRepository = new SequelizeFileRepository(Files);
const fileUseCases = new FileUseCases(fileRepository);

const editFileStatusController = new EditFileStatusController(fileUseCases);
router.put(
  '/editStatus',
  authMiddleware,
  editFileStatusController.edit.bind(editFileStatusController)
);

const pinFileController = new PinFileController(fileUseCases);
router.put('/:fileId/pin', authMiddleware, pinFileController.pin.bind(pinFileController));

// post
const createFileController = new CreateFileController(fileUseCases);
router.post('/create', authMiddleware, createFileController.create.bind(createFileController));
router.delete('/deleteFile/:fileId', authMiddleware, deleteFileById);
router.delete('/deleteAll', authMiddleware, deleteAllFiles);
export default router;
