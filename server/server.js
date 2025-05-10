import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { connectDB } from "./database/db.js";
import setupSwagger from "./swagger.js";
import userRouters from './routers/userRouters.js';
import noteRouters from './routers/noteRouters.js';
import fileRouters from './routers/fileRouters.js';
import typesRouters from './routers/typesRouter.js';
import initializeTypes from "./database/typesDB.js";
import setupGoogleAuth from './controllers/google.js';


dotenv.config();

const app = express();
const server = createServer(app); // Создаем HTTP-сервер
const wss = new WebSocketServer({ server }); // Создаем WebSocket-сервер

const PORT = process.env.PORT || 3001;

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

    setupGoogleAuth(app)
    
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

export { wss }; 
