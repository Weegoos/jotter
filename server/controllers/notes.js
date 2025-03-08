import express from "express";
import Notes from "../models/notesSchemas.js";
const router = express.Router();

export const createNote = async (req, res) => {
    try {
        const { content } = req.body;
        const userId = 2;
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
    try {
        const userId = 2; // Фиксированный userId

        const notes = await Notes.findAll({ where: { userId } });
        res.json(notes);
    } catch (error) {
        console.error("Ошибка получения заметок:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

export default router