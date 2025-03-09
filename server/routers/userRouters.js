import express from "express";
import { createUser, getUserInfo, loginUser } from "../controllers/user.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router()

router.post('/register', createUser)

router.post('/login', loginUser)

router.get("/me", authMiddleware, getUserInfo);

// -------------------- user/register -----------------------

/**
 * @swagger
 * /user/register:
 *   post:   
 *     summary: Регистрация нового пользователя
 *     tags: 
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Пользователь успешно зарегистрирован
 *       400:
 *         description: Ошибка валидации
 *       500:
 *         description: Ошибка сервера
 */


// -------------------- user/me -----------------------
/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Получение данных пользователя по access_token
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Успешное получение данных
 *       401:
 *         description: Токен отсутствует
 *       403:
 *         description: Недействительный токен
 *       500:
 *         description: Ошибка сервера
 */

export default router;
