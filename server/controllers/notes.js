import express from "express";
import Notes from "../schemas/notesSchemas.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import Files from "../schemas/fileSchemas.js";
import { wss } from "../server.js";

const router = express.Router();

export const createNote = async (req, res) => {
    try {
        const { content, fileName, title, type } = req.body;
        

        if (!content || !fileName || !title || !type) {
            return res.status(400).json({ message: "Контент и fileName, title, type обязательны" });
        }

        const file = await Files.findOne({ where: { name: fileName } });

        if (!file) {
            return res.status(404).json({ message: "Файл не найден" });
        }

        const note = await Notes.create({ content, fileId: file.id, fileName, title, type });
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

        wss.clients.forEach(client => {
            if (client.readyState === 1) {
                client.send(JSON.stringify({ event: "notes_list", fileId, notes }));
            }
        });

        res.json(notes);
    } catch (error) {
        console.error("Ошибка получения заметок:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

export const getAllPrivateNotes = async (req, res) => {
    try {
        const {fileId} = req.params;
        if (!fileId) {
            return res.status(400).json({ message: "Ошибка: fileID отсутствует." });
        }
        const privateNotes = await Notes.findAll({
            where: {type: 'private', fileId: fileId}
        });

        res.json(privateNotes)
    } catch (error) {
        console.error("Ошибка:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
}

export const getAllPublicNotes = async (req, res) => {
    try {
        const {fileId} = req.params;
        if (!fileId) {
            return res.status(400).json({ message: "Ошибка: fileID отсутствует." });
        }
        const privateNotes = await Notes.findAll({
            where: {type: 'public', fileId: fileId}
        });

        res.json(privateNotes)
    } catch (error) {
        console.error("Ошибка:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
}

export const getAllProtectedNotes = async (req, res) => {
    try {
        const {fileId} = req.params;
        if (!fileId) {
            return res.status(400).json({ message: "Ошибка: fileID отсутствует." });
        }
        const privateNotes = await Notes.findAll({
            where: {type: 'protected', fileId: fileId}
        });

        res.json(privateNotes)
    } catch (error) {
        console.error("Ошибка:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
}

export const getAllIdeaNotes = async (req, res) => {
    try {
        const {fileId} = req.params;
        if (!fileId) {
            return res.status(400).json({ message: "Ошибка: fileID отсутствует." });
        }
        const privateNotes = await Notes.findAll({
            where: {type: 'idea', fileId: fileId}
        });

        res.json(privateNotes)
    } catch (error) {
        console.error("Ошибка:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
}

export const getAllCodeNotes = async (req, res) => {
    try {
        const {fileId} = req.params;
        if (!fileId) {
            return res.status(400).json({ message: "Ошибка: fileID отсутствует." });
        }
        const privateNotes = await Notes.findAll({
            where: {type: 'code', fileId: fileId}
        });

        res.json(privateNotes)
    } catch (error) {
        console.error("Ошибка:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
}

export const updateNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const { content, title, type } = req.body;

        if (!content || !title || !type) {
            return res.status(400).json({ message: "Все поля обязательны" });
        }

        const note = await Notes.findByPk(noteId);
        if (!note) {
            return res.status(404).json({ message: "Заметка не найдена" });
        }

        note.content = content;
        note.title = title;
        note.type = type;
        await note.save();

        // 🔥 Запрашиваем обновленный список заметок
        const notes = await Notes.findAll({ where: { fileId: note.fileId } });

        // 🔥 Отправляем обновленный список ВСЕМ клиентам через WebSocket
        wss.clients.forEach(client => {
            if (client.readyState === 1) {
                client.send(JSON.stringify({ 
                    event: "notes_list", 
                    fileId: note.fileId, 
                    notes 
                }));
            }
        });

        res.json(note);
    } catch (error) {
        console.error("Ошибка обновления заметки:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};


export const deleteNoteById = async (req, res) => {
    try {
        const {noteId} = req.params;

        if(!noteId) {
            return res.status(400).json({ message: "Ошибка: nodeId отсутствует." });
        } 

        const note = await Notes.findByPk(noteId)
        if (!note) {
            return res.status(404).json({message: "Заметка не найдена"})
        }


        await note.destroy()
        res.status(200).json({ message: "Заметка успешно удалена." });
    } catch (error) {
        console.error("Ошибка при удалении заметки:", error);
        res.status(500).json({ message: "Ошибка сервера." });
    }
}

export const deleteAllNotes = async (req, res) => {
    try {
        await Notes.destroy({where})
    } catch (error) {
        
    }
}

export default router