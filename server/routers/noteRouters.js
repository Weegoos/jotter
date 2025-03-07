import express from "express";
import { createNote, getAllNotes } from "../controllers/notes.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API для управления заметками
 */

/**
 * @swagger
 * /notes/all:
 *   get:
 *     summary: Получить все заметки
 *     tags: [Notes]
 *     description: Возвращает массив всех заметок из базы данных.
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
 *                   content:
 *                     type: string
 *                     example: "Текст заметки"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-03-07T12:34:56.000Z"
 */

router.get('/all', getAllNotes);

/**
 * @swagger
 * /notes/create:
 *   post:
 *     summary: Создать новую заметку
 *     tags: [Notes]
 *     description: Добавляет новую заметку в базу данных.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Новая заметка"
 *     responses:
 *       201:
 *         description: Заметка успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Заметка создана!"
 *                 note:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     content:
 *                       type: string
 *                       example: "Новая заметка"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-07T12:34:56.000Z"
 */

router.post('/create', createNote);

export default router;
