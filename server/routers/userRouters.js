import express from "express";
import { createUser, editUserInfo, getUserInfo, loginUser } from "../controllers/user.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router()

router.post('/register', createUser)

router.post('/login', loginUser)

router.put('/edit',authMiddleware,  editUserInfo)

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


// user/login
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Вход пользователя
 *     tags: 
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Успешный вход
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Успешный вход
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Неверный email или пароль
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Неверный пароль
 *       500:
 *         description: Внутренняя ошибка сервера
 */


// -------------------- user/edit -----------------------

/**
 * @swagger
 * /user/edit:
 *   put:
 *     summary: Обновление данных пользователя
 *     tags: 
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: fullname
 *         schema:
 *           type: string
 *         description: Новое полное имя пользователя
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Новый email пользователя
 *       - in: query
 *         name: password
 *         schema:
 *           type: string
 *         description: Новый пароль (не менее 6 символов)

 *     responses:
 *       200:
 *         description: Данные пользователя успешно обновлены
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Данные пользователя успешно обновлены
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     fullname:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Ошибка валидации (например, короткий пароль или email уже существует)
 *       401:
 *         description: Неавторизован
 *       404:
 *         description: Пользователь не найден
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
