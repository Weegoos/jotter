import express from "express";
import Files from "../schemas/fileSchemas.js";
import { wss } from "../server.js";

const router = express.Router();

export const createFile = async (req, res) => {
    try {
        const { name, description} = req.body
        const userId = req.user.id
        if (!userId) {
            return res.status(400).json({ message: "userId обязателен!" });
        }
        const newFile = await Files.create({
            name,
            description, 
            userId,
            status: 'active'
        });
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN){
                client.send(JSON.stringify({
                    event: 'create_file',
                    newFile: newFile,
                }));
            }
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
   
        wss.clients.forEach(client => {
            if (client.readyState === 1){
                client.send(JSON.stringify({event: "get_files", userId, files}))
            }
        })
        res.json(files);
    } catch (error) {
        console.error("Ошибка:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
}
export const getFilesByStatus = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { status } = req.query;
        const page = parseInt(req.query.page) || 1;  
        const limit = parseInt(req.query.limit) || 10;  

        if (!userId) {
            return res.status(400).json({ message: "Ошибка: userId отсутствует." });
        }

        if (!status) {
            return res.status(400).json({ message: "Ошибка: статус обязателен." });
        }

        // Найдем файлы с учетом пагинации
        const offset = (page - 1) * limit;

        const files = await Files.findAndCountAll({
            where: { userId, status },
            limit: limit,
            offset: offset
        });

        const totalPages = Math.ceil(files.count / limit);

        wss.clients.forEach(client => {
        if (client.readyState === 1 && client.userId === userId) {
            client.send(JSON.stringify({
            event: "get_files_by_status",
            files: files.rows,
            totalCount: files.count,
            totalPages,
            currentPage: page,
            }));
        }
        });

        res.json({
            files: files.rows,
            totalCount: files.count,
            totalPages: totalPages,
            currentPage: page,
        });
    } catch (error) {
        console.error("Ошибка:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

export const editFileStatus = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { fileId, status } = req.query;

        if (!userId || !fileId || !status) {
            return res.status(400).json({ message: "Необходимы userId, fileId и status" });
        }

        const file = await Files.findOne({ where: { id: fileId, userId } });

        if (!file) {
            return res.status(404).json({ message: "Файл не найден" });
        }

        file.status = status;
        await file.save();

                wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN){
                client.send(JSON.stringify({
                    event: 'change_status',
                    file: file,
                }));
            }
        });

        res.json({ message: "Статус обновлен", file });
    } catch (error) {
        console.error("Ошибка:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};


export const getFilesName = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ message: "Ошибка: userId отсутствует." });
        }
        
        const files = await Files.findAll({ 
            where: { userId },
            attributes: ['name'] 
        });

        res.json(files.map(file => file.name)); 
    } catch (error) {
        console.error("Ошибка:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

export const deleteFileById = async (req, res) => {
    try {
        const {fileId} = req.params

        if (!fileId) {
            return res.status(400).json({ message: "Ошибка: fileId отсутствует." });
        }

        const file = await Files.findByPk(fileId)
        if (!file) {
            return res.status(404).json({ message: "Файл не найден." });
        }

        await file.destroy()

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN){
                client.send(JSON.stringify({
                    event: "deleteFileByID",
                    file: file
                }))
            }
        })
        res.status(200).json({ message: "Файл успешно удален." });
    } catch (error) {
        console.error("Ошибка при удалении файла:", error);
        res.status(500).json({ message: "Ошибка сервера." });
    }
}

export const deleteAllFiles = async (req, res) => {
    try {
        await Files.destroy({ where: {} });
        res.status(200).json({ message: "Все файлы успешно удалены." });
    } catch (error) {
        console.error("Ошибка при удалении всех файлов:", error);
        res.status(500).json({ message: "Ошибка сервера." });
    }
};


export default router;