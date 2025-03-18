import  express  from "express";
import Types from "../schemas/typeSchemas.js";

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


export default router