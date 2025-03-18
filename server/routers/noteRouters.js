import express from "express";
import { createNote, deleteNoteById, getAllNotesByFileID, getAllPrivateNotes } from "../controllers/notes.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API для управления заметками
 */

router.get('/private/:fileId/', authMiddleware, getAllPrivateNotes)

/**
 * @swagger
 * /notes/private/{fileId}:
 *   get:
 *     summary: Получить все приватные заметки для определенного файла
 *     description: Возвращает список всех заметок, у которых `type` равно "private" и `fileId` соответствует переданному значению.
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: fileId
 *         required: true
 *         description: ID файла, к которому относятся заметки.
 *         schema:
 *           type: integer
 *           example: 123
 *     responses:
 *       200:
 *         description: Успешный ответ. Возвращает массив приватных заметок, связанных с указанным `fileId`.
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
 *                   title:
 *                     type: string
 *                     example: "Моя личная заметка"
 *                   content:
 *                     type: string
 *                     example: "Это приватная заметка"
 *                   type:
 *                     type: string
 *                     example: "private"
 *                   fileId:
 *                     type: integer
 *                     example: 123
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-07-29T12:00:00.000Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-07-29T12:30:00.000Z"
 *       400:
 *         description: Ошибка запроса, если `fileId` отсутствует.
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
 *                   example: "Ошибка сервера"
 */


router.get("/:fileId", authMiddleware, getAllNotesByFileID);

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



router.post("/create", authMiddleware, createNote);
// -------------------- notes/create -----------------------

/**
 * @swagger
 * /notes/create:
 *   post:
 *     summary: Создать новую заметку
 *     tags: [Notes]
 *     description: Создаёт новую заметку в указанном файле.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Текст новой заметки"
 *               fileName:
 *                 type: string
 *                 example: "my_notes.txt"
 *               title:
 *                 type: string
 *                 example: "Идея стартапа"
 *               type:
 *                 type: string
 *                 enum: [private, public, shared]
 *                 example: "private"
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
 *                   example: "Текст новой заметки"
 *                 fileId:
 *                   type: integer
 *                   example: 5
 *                 fileName:
 *                   type: string
 *                   example: "my_notes.txt"
 *                 title:
 *                   type: string
 *                   example: "Идея стартапа"
 *                 type:
 *                   type: string
 *                   example: "private"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-03-18T12:34:56.000Z"
 *       400:
 *         description: Ошибка в запросе (отсутствуют обязательные поля).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Контент и fileName, title, type обязательны."
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


router.delete('/:noteId', authMiddleware ,deleteNoteById)

/**
 * @swagger
 * /notes/{noteId}:
 *   delete:
 *     summary: Удаление заметки по ID
 *     description: Удаляет заметку с указанным noteId из базы данных.
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Уникальный идентификатор заметки
 *     responses:
 *       200:
 *         description: Заметка успешно удалена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Заметка успешно удалена."
 *       400:
 *         description: Ошибка в запросе (например, отсутствует noteId)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка: noteId отсутствует."
 *       404:
 *         description: Заметка не найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Заметка не найдена."
 *       500:
 *         description: Внутренняя ошибка сервера
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
