import express from "express";
import Friend from "../schemas/friendSchemas.js";
import { wss } from "../server.js";
const router = express.Router();

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
