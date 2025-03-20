import  express  from "express";
import Types from "../schemas/typeSchemas.js";
import Notes from "../schemas/notesSchemas.js";
import { wss } from "../server.js";

const router = express.Router()

export const getAllTypes = async (req, res) => {
    try {
        const types = await Types.findAll()
        res.json(types)
    } catch (error) {
        console.error("Ошибка:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
}

export const getAllTypeUsedByUser = async (req, res) => {
    try {
        const types = await Notes.findAll({
            attributes: ['type'],
            group: ['type'], 
            raw: true 
        });

        const uniqueTypes = types.map(t => t.type);

        wss.clients.forEach(client => {
            if (client.readyState === 1) {
                client.send(JSON.stringify({ event: "types_userUsed", types: uniqueTypes }));
            }
        });

        res.json(uniqueTypes);
    } catch (error) {
        console.error("Ошибка:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
} 

export const getAllGeneralTypes = async (req, res) => {
    try {
        const generalTypes = await Types.findAll({
            where: { description: 'general' } 
        });

        res.json(generalTypes); 
    } catch (error) {
        console.error("Ошибка:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

export const getAllContentTypes = async (req, res) => {
    try {
        const generalTypes = await Types.findAll({
            where: { description: 'content' } 
        });

        res.json(generalTypes); 
    } catch (error) {
        console.error("Ошибка:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

export const getAllAccessLevelTypes = async (req, res) => {
    try {
        const generalTypes = await Types.findAll({
            where: { description: 'content' } 
        });

        res.json(generalTypes); 
    } catch (error) {
        console.error("Ошибка:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};


export default router