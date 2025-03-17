import express from "express";
import { createFile, getFilesByUserId, getFilesName } from "../controllers/fileControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: API для управления файлами
 */


router.post('/create',authMiddleware,  createFile)

// -------------------- file/create -----------------------

/**
 * @swagger
 * /file/create:
 *   post:
 *     summary: Создать новую папку
 *     tags: [Files]
 *     description: Добавляет новый файл в базу данных.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Новый Файл"
 *     responses:
 *       201:
 *         description: Файл успешно создан
 *         name:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Файл создан!"
 *                 file:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Новый файл"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-07T12:34:56.000Z"
 */


router.get('/allFiles', authMiddleware, getFilesByUserId)

router.get('/filesName', authMiddleware, getFilesName)

export default router;