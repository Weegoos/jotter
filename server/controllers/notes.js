import express from "express";
import Notes from "../schemas/notesSchemas.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import Files from "../schemas/fileSchemas.js";

const router = express.Router();

export const createNote = async (req, res) => {
    try {
        const { content, fileName } = req.body;
        

        if (!content || !fileName) {
            return res.status(400).json({ message: "Контент и fileName обязательны" });
        }

        const file = await Files.findOne({ where: { name: fileName } });

        if (!file) {
            return res.status(404).json({ message: "Файл не найден" });
        }

        const note = await Notes.create({ content, fileId: file.id, fileName });
        res.status(201).json(note);
    } catch (error) {
        console.error("Ошибка создания заметки:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};
export const getAllNotesByFileID = async (req, res) => {
    console.log("🔹 Вызван getAllNotes. req.user:", req.user);

    try {
        const {fileId} = req.params;
        if (!fileId) {
            return res.status(400).json({ message: "Ошибка: fileID отсутствует." });
        }
        const notes = await Notes.findAll({ where: { fileId: fileId } });
        res.json(notes);
    } catch (error) {
        console.error("Ошибка получения заметок:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};


export default router