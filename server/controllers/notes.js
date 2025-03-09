import express from "express";
import Notes from "../models/notesSchemas.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

export const createNote = async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.user.id; // Получаем userId из токена

        if (!content || !userId) {
            return res.status(400).json({ message: "Контент и userId обязательны" });
        }

        const note = await Notes.create({ content, userId });
        res.status(201).json(note);
    } catch (error) {
        console.error("Ошибка создания заметки:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};
export const getAllNotes = async (req, res) => {
    console.log("🔹 Вызван getAllNotes. req.user:", req.user);

    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ message: "Ошибка: userId отсутствует." });
        }

        const notes = await Notes.findAll({ where: { userId } });
        res.json(notes);
    } catch (error) {
        console.error("Ошибка получения заметок:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};


export default router