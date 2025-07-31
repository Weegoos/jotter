import jwt from 'jsonwebtoken';
import { UniqueConstraintError, ValidationError } from 'sequelize';
export class PostUserController {
  constructor(userUseCase) {
    this.userUseCase = userUseCase;
  }

  async createUser(req, res) {
    try {
      const { fullname, email, password } = req.body;

      const newUser = await this.userUseCase.createUser(fullname, email, password);

      return res.status(201).json({
        message: 'Пользователь зарегистрирован!',
        user: newUser,
      });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        console.error('Нарушено уникальное ограничение:', error.errors);
        return res.status(400).json({ message: 'Email или имя уже используется' });
      }

      if (error instanceof ValidationError) {
        console.error('Ошибка валидации:', error.errors);
        return res.status(400).json({ message: 'Ошибка данных при создании пользователя' });
      }

      if (error.message.includes('This email has already been registered')) {
        return res.status(404).json({ message: 'Эта электронная почта уже зарегистрирована.' });
      }

      if (error.message.includes('This name is already taken')) {
        return res.status(404).json({ message: 'Это имя уже занято' });
      }

      if (error.message.includes('The password error')) {
        return res
          .status(404)
          .json({ message: 'Длина пароля должна составлять не менее 6 символов.' });
      }

      console.error('Необработанная ошибка:', error.message);
      console.error('Stack trace:', error.stack);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await this.userUseCase.loginUser(email, password);

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
      });

      res.json({ message: 'Успешный вход', user, token });
    } catch (error) {
      if (error.message.includes('Email and password are required')) {
        return res
          .status(404)
          .json({ message: 'Требуется указать адрес электронной почты и пароль' });
      }

      if (error.message.includes('USER NOT FOUND')) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }

      if (error.message.includes('Invalid password')) {
        return res.status(404).json({ message: 'Неверный пароль' });
      }

      console.error('Ошибка при входе:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}
