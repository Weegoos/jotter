import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB, sequelize } from "./database/db.js";
import setupSwagger from "./swagger.js";

import userRouters from './routers/userRouters.js'
import noteRouters  from './routers/noteRouters.js'
import fileRouters from './routers/fileRouters.js'

// schemas

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
        origin: "*"
    }));

    app.use(express.json());

    app.use("/user", userRouters);
    app.use('/notes', noteRouters)
    app.use('/file', fileRouters)

    app.get("/", (req, res) => {
        res.send("Сервер работает!");
    });

    setupSwagger(app);

    app.listen(PORT, () => {
        console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    });
})();
