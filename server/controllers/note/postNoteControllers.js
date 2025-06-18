import Files from "../../schemas/fileSchemas.js";
import Notes from "../../schemas/notesSchemas.js";
import { wss } from "../../server.js";

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

