import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import "./swagger/fileSwagger.js"; 
import { getFilesByStatus, getFilesByUserId, getFilesName } from "../controllers/file/getFileControllers.js";
import { createFile } from "../controllers/file/postFileController.js";
const router = express.Router();


router.post('/create',authMiddleware,  createFile)

router.get('/allFiles', authMiddleware, getFilesByUserId)
router.get('/filesName', authMiddleware, getFilesName)
router.get('/filesStatus', authMiddleware, getFilesByStatus)

// router.put('/editStatus', authMiddleware, editFileStatus)

// router.delete('/deleteFile/:fileId', authMiddleware, deleteFileById)
// router.delete('/deleteAll', authMiddleware, deleteAllFiles)
export default router;