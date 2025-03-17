import express from "express";
import Files from "../schemas/fileSchemas.js";

const router = express.Router();

export const createFile = async (req, res) => {
    try {
        const { name } = req.body
        const userId = req.user.id
        if (!userId) {
            return res.status(400).json({ message: "userId обязателен!" });
        }
        const newFile = await Files.create({
            name,
            userId
        });

        res.status(201).json({ message: "Файл создан!", file: newFile });
    } catch (error) {
        console.error("Ошибка при создании папки:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
}

export const getFilesByUserId = async (req, res) => {
    try {
        const userId = req.user.id
        if (!userId) {
            return res.status(400).json({ message: "Ошибка: userId отсутствует." });
        }
        const files = await Files.findAll({ where: { userId } });
        res.json(files);
    } catch (error) {
        console.error("Ошибка:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
}

export const getFilesName = async (req, res) => {
    
}

export default router;