import express from "express";
import { createFile, deleteAllFiles, deleteFileById, getFilesByStatus, getFilesByUserId, getFilesName } from "../controllers/fileControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import "./swagger/fileSwagger.js"; 
const router = express.Router();


router.post('/create',authMiddleware,  createFile)
router.get('/allFiles', authMiddleware, getFilesByUserId)
router.get('/filesName', authMiddleware, getFilesName)
router.get('/filesStatus', authMiddleware, getFilesByStatus)
router.delete('/deleteFile/:fileId', authMiddleware, deleteFileById)
router.delete('/deleteAll', authMiddleware, deleteAllFiles)
export default router;