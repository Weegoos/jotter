import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import { getAllTypes } from "../controllers/typesControllers.js"

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Types
 *   description: API для управления типами заметок и файлов
 */


router.get('', authMiddleware, getAllTypes)

/**
 * @swagger
 * /types:
 *   get:
 *     summary: Получить все типы заметок
 *     tags: [Types]
 *     description: Возвращает массив всех доступных типов заметок.
 *     responses:
 *       200:
 *         description: Успешный ответ. Возвращает список типов.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "private"
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


export default router