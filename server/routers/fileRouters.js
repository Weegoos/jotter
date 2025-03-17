import express from "express";
import { createFile, getFilesByUserId, getFilesName } from "../controllers/fileControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/create',authMiddleware,  createFile)

router.get('/allFiles', authMiddleware, getFilesByUserId)

router.get('/filesName', authMiddleware, getFilesName)

export default router;