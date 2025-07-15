
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UniqueConstraintError, ValidationError } from 'sequelize';
import User from '../../../infrastructure/database/models/userSchemas.js';

export const createUser = async (req, res) => {
  try {
    console.log('🟡 [START] createUser');

    const { fullname, email, password } = req.body;
    console.log('📥 Получен запрос:', { fullname, email, password });

    // 💬 Проверка обязательных полей
    console.log('🔎 Проверка обязательных полей...');
    if (!fullname || !email || !password) {
      console.warn('⚠️ Отсутствуют обязательные поля');
      return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
    }

    // ✉️ Очистка и валидация email
    console.log('✉️ Очистка и валидация email...');
    const cleanedEmail = email.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(cleanedEmail)) {
      console.warn('⚠️ Неверный формат почты:', cleanedEmail);
      return res.status(400).json({ message: 'Неверный формат почты' });
    }

    // 🧑 Проверка на уникальность
    console.log('🧠 Проверка уникальности имени и email...');
    const [existingUser, existingFullname] = await Promise.all([
      User.findOne({ where: { email: cleanedEmail } }),
      User.findOne({ where: { fullname } }),
    ]);

    if (existingUser) {
      console.warn('⚠️ Email уже зарегистрирован:', cleanedEmail);
      return res.status(400).json({ message: 'Этот email уже зарегистрирован' });
    }

    if (existingFullname) {
      console.warn('⚠️ Имя уже занято:', fullname);
      return res.status(400).json({ message: 'Это имя уже занято' });
    }

    // 🔐 Проверка пароля
    console.log('🔐 Проверка пароля...');
    if (password.length < 6) {
      console.warn('⚠️ Пароль слишком короткий');
      return res.status(400).json({ message: 'Пароль должен быть минимум 6 символов' });
    }

    // 🧂 Хеширование пароля
    console.log('🔄 Хеширование пароля...');
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log('✅ Пароль захеширован');

    // 🏗 Создание пользователя
    console.log('🏗 Создание пользователя в базе данных...');
    const newUser = await User.create({
      fullname,
      email: cleanedEmail,
      password: hashedPassword,
    });

    console.log('✅ Пользователь успешно создан:', newUser?.fullname);
    console.log('📦 Объект пользователя:', newUser?.toJSON?.() || newUser);

    return res.status(201).json({
      message: 'Пользователь зарегистрирован!',
      user: newUser,
    });
  } catch (error) {
    // 🎯 Sequelize ошибки
    if (error instanceof UniqueConstraintError) {
      console.error('❗ Нарушено уникальное ограничение:', error.errors);
      return res.status(400).json({ message: 'Email или имя уже используется' });
    }

    if (error instanceof ValidationError) {
      console.error('⚠️ Ошибка валидации:', error.errors);
      return res.status(400).json({ message: 'Ошибка данных при создании пользователя' });
    }

    // ❌ Неизвестная ошибка
    console.error('❌ Необработанная ошибка:', error.message);
    console.error('🧵 Stack trace:', error.stack);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Неверный пароль' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });

    res.json({ message: 'Успешный вход', user, token });
  } catch (error) {
    console.error('Ошибка при входе:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
