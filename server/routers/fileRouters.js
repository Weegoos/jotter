import express from "express";
import { createFile, deleteAllFiles, deleteFileById, getFilesByUserId, getFilesName } from "../controllers/fileControllers.js";
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
 *     summary: Создать новый файл
 *     tags: [Files]
 *     description: Создает новый файл и привязывает его к пользователю.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Новый Файл"
 *                 description: "Название создаваемого файла"
 *     responses:
 *       201:
 *         description: Файл успешно создан.
 *         content:
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
 *                       example: "Новый Файл"
 *                     userId:
 *                       type: integer
 *                       example: 5
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-07T12:34:56.000Z"
 *       400:
 *         description: Ошибка запроса (например, отсутствует userId).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "userId обязателен!"
 *       500:
 *         description: Ошибка сервера.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка сервера"
 */

router.get('/allFiles', authMiddleware, getFilesByUserId)

/**
 * @swagger
 * /file/allFiles:
 *   get:
 *     summary: Получить все файлы
 *     tags: [Files]
 *     description: Возвращает массив всех файлов из базы данных.
 *     responses:
 *       200:
 *         description: Успешный ответ. Возвращает массив файлов.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   content:
 *                     type: string
 *                     example: "Текст файла"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-03-07T12:34:56.000Z"
 */

router.get('/filesName', authMiddleware, getFilesName)

/**
 * @swagger
 * /file/filesName:
 *   get:
 *     summary: Получить название файлов
 *     tags: [Files]
 *     description: Возвращает массив название всех файлов из базы данных.
 *     responses:
 *       200:
 *         description: Успешный ответ. Возвращает массив название файлов.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   content:
 *                     type: string
 *                     example: "Текст файла"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-03-07T12:34:56.000Z"
 */


router.delete('/deleteFile/:fileId', authMiddleware, deleteFileById)

/**
 * @swagger
 * /file/deleteFile/{fileId}:
 *   delete:
 *     summary: Удалить файл по ID
 *     tags: [Files]
 *     description: Удаляет файл по его ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Уникальный идентификатор файла
 *     responses:
 *       200:
 *         description: Файл успешно удален.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Файл успешно удален."
 *       400:
 *         description: Ошибка запроса (отсутствует fileId).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка: fileId отсутствует."
 *       404:
 *         description: Файл не найден.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Файл не найден."
 *       500:
 *         description: Ошибка сервера.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка сервера."
 */

router.delete('/deleteAll', authMiddleware, deleteAllFiles)

/**
 * @swagger
 * /file/deleteAll:
 *   delete:
 *     summary: Удалить все файлы
 *     tags: [Files]
 *     description: Удаляет все файлы из базы данных.
 *     responses:
 *       200:
 *         description: Все файлы успешно удалены.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Все файлы успешно удалены."
 *       500:
 *         description: Ошибка сервера.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка сервера."
 */

export default router;