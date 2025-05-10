import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { connectDB } from "./database/db.js";
import setupSwagger from "./swagger.js";
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import crypto from 'crypto';


const generateSessionSecret = () => {
    return crypto.randomBytes(32).toString('hex'); // Генерация случайной строки длиной 64 символа
  };
  const sessionSecret = generateSessionSecret();

  

import userRouters from './routers/userRouters.js';
import noteRouters from './routers/noteRouters.js';
import fileRouters from './routers/fileRouters.js';
import typesRouters from './routers/typesRouter.js';
import initializeTypes from "./database/typesDB.js";
import User from "./schemas/userSchemas.js";

const GOOGLE_CLIENT_ID = '73082754377-g6c90030a3v1mtsvjfrvk7jv8bbsnikt.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

dotenv.config();

const app = express();
const server = createServer(app); // Создаем HTTP-сервер
const wss = new WebSocketServer({ server }); // Создаем WebSocket-сервер

const PORT = process.env.PORT || 3001;

// Сессия
app.use(session({
    secret: sessionSecret,  // Использование сгенерированного секрета
    resave: false,
    saveUninitialized: true
  }));
  
app.use(passport.initialize());
app.use(passport.session());

  // Сериализация пользователя
passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

// Google OAuth2 стратегия

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const { displayName, emails } = profile;
      const email = emails[0].value;
      
      const db = await connectDB();
      if (!db) {
        return done(new Error('Ошибка подключения к базе данных'));
      }

      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        // Добавляем accessToken в объект пользователя
        return done(null, { ...existingUser, accessToken });
      } else {
        const newUser = await User.create({
          fullname: displayName,
          email: email,
          password: null 
        });

        console.log('AccessToken:', accessToken);

        // Добавляем accessToken в объект пользователя
        return done(null, { ...newUser, accessToken });
      }
    } catch (error) {
      console.error('Ошибка при создании пользователя: ', error);
      return done(error);
    }
  }
));

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    if (req.user && req.user.accessToken) {
      const accessToken = req.user.accessToken;
      console.log('Access token:', accessToken); 

       res.cookie('access_token', accessToken, {
        httpOnly: true,        // Нельзя получить через JS
        secure: false,         // Включить true, если используешь HTTPS
        sameSite: 'lax',       // Или 'strict' / 'none' при необходимости
        maxAge: 3600 * 1000    // 1 час
      });


      res.redirect(`http://localhost:9000/#/login?access_token=${accessToken}`);
    } else {
      console.log('Ошибка: accessToken не найден');
      res.redirect('http://localhost:9000/#/login');
    }
  }
);



// Подключение к базе данных
(async () => {
    const db = await connectDB();
    if (!db) {
        console.error("❌ База данных не подключена");
        process.exit(1);
    }

    app.use(cors({
        credentials: true,
        origin: "*"
    }));

    app.use(express.json());

    app.use("/user", userRouters);
    app.use('/notes', noteRouters);
    app.use('/file', fileRouters);
    app.use('/types', typesRouters);
    
    initializeTypes();

    app.get("/", (req, res) => {
        res.send("Сервер работает!");
    });

    setupSwagger(app);

    // WebSocket обработка подключений
    wss.on("connection", (ws) => {
        console.log("🔌 Клиент подключился к WebSocket");

        ws.on("message", (message) => {
            console.log("📩 Получено сообщение:", message.toString());
        });

        ws.on("close", () => {
            console.log("❌ Клиент отключился");
        });
    });

    server.listen(PORT, () => {
        console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    });
})();

export { wss }; // Экспортируем WebSocket сервер
