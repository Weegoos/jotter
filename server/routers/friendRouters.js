import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addFriend } from "../controllers/friendControllers.js";
import "./swagger/friendSwagger.js"; 
const router = express.Router();

router.post('/add', authMiddleware, addFriend)

export default router;