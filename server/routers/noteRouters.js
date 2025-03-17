import express from "express";
import { createNote, getAllNotesByFileID } from "../controllers/notes.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API для управления заметками
 */


router.get("/:fileId", authMiddleware, getAllNotesByFileID);


router.post("/create", authMiddleware, createNote);

// -------------------- notes/all -----------------------

/**
 * @swagger
 * /notes/{fileId}:
 *   get:
 *     summary: Получить все заметки по ID файла
 *     tags: [Notes]
 *     description: Возвращает все заметки, связанные с указанным fileId.
 *     parameters:
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID файла, для которого нужно получить заметки.
 *     responses:
 *       200:
 *         description: Успешный ответ. Возвращает массив заметок.
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
 *                   fileId:
 *                     type: integer
 *                     example: 5
 *                   content:
 *                     type: string
 *                     example: "Текст заметки"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-03-07T12:34:56.000Z"
 *       400:
 *         description: Ошибка в запросе (например, отсутствует fileId).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка: fileID отсутствует."
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



// -------------------- notes/create -----------------------

/**
 * @swagger
 * /notes/create:
 *   post:
 *     summary: Создать новую заметку
 *     tags: [Notes]
 *     description: Создает новую заметку, привязанную к файлу.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - fileName
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Текст заметки"
 *               fileName:
 *                 type: string
 *                 example: "Документ1"
 *     responses:
 *       201:
 *         description: Заметка успешно создана.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 content:
 *                   type: string
 *                   example: "Текст заметки"
 *                 fileId:
 *                   type: integer
 *                   example: 5
 *                 fileName:
 *                   type: string
 *                   example: "Документ1"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-03-07T12:34:56.000Z"
 *       400:
 *         description: Ошибка запроса (например, отсутствует content или fileName).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Контент и fileName обязательны"
 *       404:
 *         description: Файл не найден.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Файл не найден"
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


export default router;
