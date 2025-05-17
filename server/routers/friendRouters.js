import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { changeFriendStatus, getUserByStatus, sendRequestToTheFriend } from "../controllers/friendControllers.js";
import "./swagger/friendSwagger.js"; 
const router = express.Router();

router.post('/add', authMiddleware, sendRequestToTheFriend)

router.get('/getByStatus', authMiddleware, getUserByStatus)

router.put('/changeStatus', authMiddleware, changeFriendStatus)

export default router;