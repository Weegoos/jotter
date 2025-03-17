import express from "express";
import { createFile, getFilesByUserId } from "../controllers/fileControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/create',authMiddleware,  createFile)

router.get('/allFiles', authMiddleware, getFilesByUserId)

export default router;