import { Op } from "sequelize";
import User from "../../schemas/userSchemas.js";

export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.json(user);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user?.id; // например, получаем id текущего пользователя из запроса

    if (!currentUserId) {
      return res.status(401).json({ message: "Неавторизованный запрос" });
    }

    const users = await User.findAll({
      where: {
        id: {
          [Op.ne]: currentUserId, // id пользователя не равен текущему
        },
      },
    });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Пользователи не найдены" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const allUsersByInput = async (req, res) => {
  try {
    const { fullname } = req.query;
    const currentUserId = req.user?.id;

    if (!fullname) {
      return res.status(400).json({ message: "Параметр fullname обязателен" });
    }
    if (!currentUserId) {
      return res.status(401).json({ message: "Неавторизованный запрос" });
    }

    const users = await User.findAll({
      where: {
        fullname: {
          [Op.iLike]: `%${fullname}%`,
        },
        id: {
          [Op.ne]: currentUserId, // исключаем текущего пользователя
        },
      },
    });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Пользователи не найдены" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
