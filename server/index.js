const express = require("express");
const path = require("path");

const app = express();

// Указываем, что статические файлы берём из Quasar-сборки
app.use(express.static(path.join(__dirname, "../client/dist/spa")));

// Обрабатываем все маршруты и отдаём `index.html` (для работы Vue Router)
app.get("/", (_, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/spa", "index.html"));
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
