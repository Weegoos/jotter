import express from "express";
import { createUser, editUserInfo, getUserInfo, loginUser } from "../controllers/user.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import "./swagger/userSwagger.js"; 
const router = express.Router()

router.post('/register', createUser)

router.post('/login', loginUser)

router.put('/edit',authMiddleware,  editUserInfo)

router.get("/me", authMiddleware, getUserInfo);


export default router;
