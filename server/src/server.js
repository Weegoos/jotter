import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { connectDB } from './infrastructure/database/db.js';
import setupSwagger from './swagger.js';
import jwt from 'jsonwebtoken';

import userRouters from './presentation/routers/userRouters.js';
import noteRouters from './presentation/routers/noteRouters.js';
import fileRouters from './presentation/routers/fileRouters.js';
import typesRouters from './presentation/routers/typesRouter.js';
import friendRouters from './presentation/routers/friendRouters.js';
import hashtagsRouters from './presentation/routers/hastagsRouters.js';
import taskRouters from './presentation/routers/taskRouters.js';

import initializeTypes from './infrastructure/database/typesDB.js';
import initializeHashTag from './infrastructure/database/hashtagDB.js';

import setupGoogleAuth from './presentation/controllers/google.js';
import './infrastructure/database/models/friendSchemas.js';

dotenv.config();

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 3001;

// Подключение к базе данных
(async () => {
  const db = await connectDB();
  if (!db) {
    console.error('❌ База данных не подключена');
    process.exit(1);
  }

  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:9000', // без слэша в конце
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    })
  );

  app.use(express.json());

  app.use('/user', userRouters);
  app.use('/notes', noteRouters);
  app.use('/file', fileRouters);
  app.use('/types', typesRouters);
  app.use('/friend', friendRouters);
  app.use('/hashtag', hashtagsRouters);
  app.use('/tasks', taskRouters);

  setupGoogleAuth(app);

  initializeTypes();
  initializeHashTag();

  app.get('/', (req, res) => {
    res.send('Сервер работает!');
  });

  setupSwagger(app);

  wss.on('connection', (ws, req) => {
    console.log('🔌 Клиент подключился к WebSocket');

    try {
      // Получаем куки из заголовка
      const cookies = req.headers.cookie;

      if (!cookies) {
        console.log('❌ Куки отсутствуют');
        ws.close();
        return;
      }
      const token = cookies
        .split(';')
        .map((c) => c.trim())
        .find((c) => c.startsWith('access_token='))
        ?.split('=')[1];

      if (!token || token.trim() === '') {
        console.log('❌ Токен пустой или отсутствует');
        ws.close();
        return;
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      ws.userId = decoded.id;
      console.log('✅ Авторизован пользователь:', ws.userId);
    } catch (error) {
      console.log('❌ Ошибка авторизации:', error.message);
      ws.close();
      return;
    }

    ws.on('message', (message) => {
      console.log('📩 Получено сообщение:', message.toString());
    });

    ws.on('close', () => {
      console.log('❌ Клиент отключился');
    });
  });

  server.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на ${process.env.SERVER_URL || `http://localhost:${PORT}`}`);
  });
})();

export { wss };
