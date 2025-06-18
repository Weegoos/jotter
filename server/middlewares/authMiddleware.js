import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Нет доступа. Токен отсутствует." });
  }

  const token = authHeader.split(" ")[1]; // Берем сам токен без "Bearer"

  if (!token) {
    return res.status(401).json({ message: "Формат токена неверный." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("❌ Ошибка проверки токена:", error);
    return res.status(403).json({ message: "Недействительный токен." });
  }
};

export default authMiddleware;
