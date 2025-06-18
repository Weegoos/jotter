import express from "express";
import {
  allUsersByInput,
  createUser,
  editUserInfo,
  getAllUsers,
  getUserInfo,
  loginUser,
} from "../controllers/user.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import "./swagger/_userSwagger.js";
const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);

router.put("/edit", authMiddleware, editUserInfo);

router.get("/me", authMiddleware, getUserInfo);

router.get("/allUsers", authMiddleware, getAllUsers);

router.get("/allUsersByInput", authMiddleware, allUsersByInput);

export default router;
