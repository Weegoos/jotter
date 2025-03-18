import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false, // Отключаем SQL логи
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("✅ Подключение к базе данных установлено.");
        await sequelize.sync({alter: true});
        console.log("✅ Таблицы синхронизированы.");
        return sequelize;
    } catch (error) {
        console.error("❌ Ошибка подключения:", error);
        return null;
    }
}
export { sequelize, connectDB };
