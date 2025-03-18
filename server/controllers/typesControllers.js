import  express  from "express";
import Types from "../schemas/typeSchemas.js";

const router = express.Router()

export const getAllTypes = async (req, res) => {
    try {
        const types = await Types.findAll({attributes: ['name']})
        res.json(types)
    } catch (error) {
        console.error("Ошибка:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
}

export default router