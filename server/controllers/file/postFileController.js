import Files from "../../schemas/fileSchemas.js";
import { wss } from "../../server.js";

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

