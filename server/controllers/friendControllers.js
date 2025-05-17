import express from "express";
import { Op } from "sequelize";
import Friend from "../schemas/friendSchemas.js";
import User from "../schemas/userSchemas.js";
const router = express.Router();

export const addFriend = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { fullname } = req.query; 

    if (!userId) {
      return res.status(401).json({ message: "Неавторизованный пользователь" });
    }

    if (!fullname) {
      return res.status(400).json({ message: "Параметр fullname обязателен" });
    }

    const friendUser = await User.findOne({
      where: { fullname }
    });

    if (!friendUser) {
      return res.status(404).json({ message: "Пользователь с таким именем не найден" });
    }

    const friendId = friendUser.id;

    if (parseInt(userId) === parseInt(friendId)) {
      return res.status(400).json({ message: "Нельзя добавить себя в друзья" });
    }

    const existingFriend = await Friend.findOne({
      where: {
        userId,
        friendId,
        fullname: friendUser.fullname  // здесь лучше брать fullname из friendUser, а не из query
      }
    });

    if (existingFriend) {
      return res.status(409).json({ message: "Пользователь уже в друзьях" });
    }

    const newFriend = await Friend.create({
      userId,
      friendId,
      fullname: friendUser.fullname   // обязательно передаём fullname при создании
    });

    res.status(201).json({ message: "Друг добавлен", friend: newFriend });
  } catch (error) {
    console.error("Ошибка при добавлении в друзья:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export default router;