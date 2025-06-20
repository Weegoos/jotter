import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import "./swagger/friendSwagger.js";
import {
  getAllFriends,
  getUserByStatus,
} from "../controllers/friend/getFriendControllers.js";
import { sendRequestToTheFriend } from "../controllers/friend/postFriendControllers.js";
import { changeFriendStatus } from "../controllers/friend/putFriendControllers.js";
import { deleteFileById } from "../controllers/file/deleteFileControllers.js";
const router = express.Router();

router.post("/add", authMiddleware, sendRequestToTheFriend);

router.get("/getAll", authMiddleware, getAllFriends);
router.get("/getByStatus", authMiddleware, getUserByStatus);

router.put("/changeStatus", authMiddleware, changeFriendStatus);

router.delete("/deleteById", authMiddleware, deleteFileById);

export default router;
