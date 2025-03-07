import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userSchemas.js"; 

const router = express.Router();

// Эндпоинт для регистрации пользователя
router.post("/register", async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Проверяем, есть ли уже такой email в базе
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Этот email уже зарегистрирован!" });
        }

        // Хешируем пароль перед сохранением
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаем нового пользователя
        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "Пользователь зарегистрирован!", user: newUser });

    } catch (error) {
        console.error("Ошибка при регистрации:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

export default router;
