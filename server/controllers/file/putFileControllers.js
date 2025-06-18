import Files from "../../schemas/fileSchemas.js";
import { wss } from "../../server.js";

export const editFileStatus = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { fileId, status } = req.query;

    if (!userId || !fileId || !status) {
      return res
        .status(400)
        .json({ message: "Необходимы userId, fileId и status" });
    }

    const file = await Files.findOne({ where: { id: fileId, userId } });

    if (!file) {
      return res.status(404).json({ message: "Файл не найден" });
    }

    file.status = status;
    await file.save();

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            event: "change_status",
            file: file,
          }),
        );
      }
    });

    res.json({ message: "Статус обновлен", file });
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
