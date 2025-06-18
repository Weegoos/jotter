import express from "express";
import { Op } from "sequelize";
import Friend from "../schemas/friendSchemas.js";
import User from "../schemas/userSchemas.js";
import dotenv from "dotenv";
import { wss } from "../server.js";
const router = express.Router();

export const sendRequestToTheFriend = async (req, res) => {
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
      where: { fullname },
    });

    if (!friendUser) {
      return res
        .status(404)
        .json({ message: "Пользователь с таким именем не найден" });
    }

    const friendId = friendUser.id;

    if (parseInt(userId) === parseInt(friendId)) {
      return res.status(400).json({ message: "Нельзя добавить себя в друзья" });
    }

    const existingFriend = await Friend.findOne({
      where: {
        userId,
        friendId,
        fullname: friendUser.fullname,
      },
    });

    if (existingFriend) {
      return res.status(409).json({ message: "Пользователь уже в друзьях" });
    }

    const newFriend = await Friend.create({
      userId,
      friendId,
      fullname: friendUser.fullname,
      status: process.env.PENDIND_STATUS,
    });

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        // 🔥 Отправляем событие о новой заметке
        client.send(
          JSON.stringify({
            event: "new_friend",
            newFriend: newFriend,
          }),
        );
      }
    });

    res
      .status(201)
      .json({ message: "Запрос отправлен пользователю", friend: newFriend });
  } catch (error) {
    console.error("Ошибка при добавлении в друзья:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const getAllFriends = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Неавторизованный пользователь" });
    }

    const friends = await Friend.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]], // например, по дате добавления — опционально
    });

    res.status(200).json({ friends });
  } catch (error) {
    console.error("Ошибка при получении друзей:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const getUserByStatus = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { status } = req.query;

    if (!userId) {
      return res.status(401).json({ message: "Неавторизованный пользователь" });
    }

    if (!status) {
      return res.status(400).json({ message: "Параметр status обязателен" });
    }
    const friends = await Friend.findAll({
      where: {
        userId,
        status,
      },
    });

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ event: "allFriendsByStatus", friends }));
      }
    });

    res.status(200).json({ friends });
  } catch (error) {
    console.error("Ошибка при добавлении в друзья:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const changeFriendStatus = async (req, res) => {
  try {
    const userId = req.user?.id; // текущий пользователь из авторизации
    const { status, friendId } = req.query;

    if (!userId) {
      return res.status(401).json({ message: "Неавторизованный пользователь" });
    }

    if (!friendId) {
      return res.status(400).json({ message: "Параметр friendId обязателен" });
    }

    if (!status) {
      return res.status(400).json({ message: "Параметр status обязателен" });
    }

    const friend = await Friend.findOne({
      where: {
        userId,
        friendId,
      },
    });

    if (!friend) {
      return res.status(404).json({ message: "Дружба не найдена" });
    }

    friend.status = status;
    await friend.save();

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ event: "changeFriendStatus", friend }));
      }
    });

    res.status(200).json({ message: "Статус обновлён", friend });
  } catch (error) {
    console.error("Ошибка при изменении статуса друга:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const deleteFriendById = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { friendId } = req.query;

    if (!friendId) {
      return res.status(400).json({ message: "Параметр friendId обязателен" });
    }

    const friend = await Friend.findOne({
      where: {
        userId,
        friendId,
      },
    });

    if (!friend) {
      return res.status(404).json({ message: "Друг не найден." });
    }

    await friend.destroy();

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ event: "deleteFromFriend", friend }));
      }
    });

    res.status(200).json({ message: "Друг успешно удален." });
  } catch (error) {
    console.error("Ошибка при изменении статуса друга:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export default router;
