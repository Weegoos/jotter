import express from "express";
import { createUser, loginUser } from "../controllers/user.js";

const router = express.Router()

router.post('/register', createUser)

router.post('/login', loginUser)

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

export default router;
