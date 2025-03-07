import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./database/db.js";

import userRoutes from './controllers/user.js'
import noteRouters  from './routers/noteRouters.js'

dotenv.config();

const app = express();
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
        origin: "http://localhost:9000"
    }));

    app.use(express.json());

    app.use("/user", userRoutes);

    app.use('/notes', noteRouters)

    app.get("/", (req, res) => {
        res.send("Сервер работает!");
    });

    app.listen(PORT, () => {
        console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    });
})();
