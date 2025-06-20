import User from "../../schemas/userSchemas.js";
import bcrypt from "bcrypt";

export const editUserInfo = async (req, res) => {
  try {
    const { fullname, email, password } = req.query; // теперь данные берутся из query
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    if (fullname) {
      user.fullname = fullname;
    }

    if (email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser && existingUser.id !== user.id) {
        return res
          .status(400)
          .json({ message: "Этот email уже зарегистрирован!" });
      }
      user.email = email;
    }

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ message: "Пароль слишком короткий" });
      }
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json({ message: "Данные пользователя успешно обновлены", user });
  } catch (error) {
    console.error("Ошибка при редактировании данных:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};