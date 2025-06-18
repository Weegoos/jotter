import express from "express";
import Notes from "../schemas/notesSchemas.js";
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
        const types = await Notes.findAll({
            attributes: ['type'],
            group: ['type'],
            raw: true
        });

        const uniqueTypes = types.map(t => t.type);

        wss.clients.forEach(client => {
            if (client.readyState === 1) {
                client.send(JSON.stringify({ 
                    event: "create_note",
                    note: note
                }));
                client.send(JSON.stringify({ 
                    event: "types_userUsed",
                    types: uniqueTypes 
                }));
            }
        });

        res.status(201).json(note);
    } catch (error) {
        console.error("Ошибка создания заметки:", error);
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

        const types = await Notes.findAll({
            attributes: ['type'],
            group: ['type'], 
            raw: true 
        });

        const uniqueTypes = types.map(t => t.type);


        wss.clients.forEach(client => {
            if (client.readyState === 1) {
                client.send(JSON.stringify({ 
                    event: "delete_note",
                    note: note
                }));
                client.send(JSON.stringify({ event: "types_userUsed", types: uniqueTypes }));
            }
        })
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