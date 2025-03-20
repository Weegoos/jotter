import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import { getAllAccessLevelTypes, getAllContentTypes, getAllGeneralTypes, getAllTypes, getAllTypeUsedByUser } from "../controllers/typesControllers.js"

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

router.get('/usedByUser', authMiddleware, getAllTypeUsedByUser)

/**
 * @swagger
 * /types/usedByUser:
 *   get:
 *     summary: Получить все используемые типы заметок
 *     description: Возвращает список всех типов заметок, которые используются в базе данных.
 *     tags:
 *       - Types
 *     responses:
 *       200:
 *         description: Успешный ответ с массивом типов заметок.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     example: "code"
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


router.get('/general', authMiddleware, getAllGeneralTypes)

/**
 * @swagger
 * /types/general:
 *   get:
 *     summary: Получить все типы с описанием "general"
 *     description: Возвращает список всех типов, у которых `description` равно "general".
 *     tags:
 *       - Types
 *     responses:
 *       200:
 *         description: Успешный ответ. Возвращает массив объектов с типами.
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
 *                   name:
 *                     type: string
 *                     example: "public"
 *                   description:
 *                     type: string
 *                     example: "general"
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка сервера"
 */

router.get('/content', authMiddleware, getAllContentTypes)

/**
 * @swagger
 * /types/content:
 *   get:
 *     summary: Получить все типы с описанием "content"
 *     description: Возвращает список всех типов, у которых `description` равно "content".
 *     tags:
 *       - Types
 *     responses:
 *       200:
 *         description: Успешный ответ. Возвращает массив объектов с типами.
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
 *                   name:
 *                     type: string
 *                     example: "public"
 *                   description:
 *                     type: string
 *                     example: "content"
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка сервера"
 */

router.get('/accessLevel', authMiddleware, getAllAccessLevelTypes)

/**
 * @swagger
 * /types/accessLevel:
 *   get:
 *     summary: Получить все типы с описанием "accessLevel"
 *     description: Возвращает список всех типов, у которых `description` равно "accessLevel".
 *     tags:
 *       - Types
 *     responses:
 *       200:
 *         description: Успешный ответ. Возвращает массив объектов с типами.
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
 *                   name:
 *                     type: string
 *                     example: "public"
 *                   description:
 *                     type: string
 *                     example: "accessLevel"
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка сервера"
 */


export default router