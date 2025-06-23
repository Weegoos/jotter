import Files from "../../schemas/fileSchemas.js";
import Notes from "../../schemas/notesSchemas.js";
import { wss } from "../../server.js";
import bcrypt from "bcrypt";
import { encrypt } from "../crypto.js";

export const createNote = async (req, res) => {
  try {
    const { content, fileName, title, type, password } = req.body;

    if (!content || !fileName || !title || !type) {
      return res.status(400).json({
        message: "Контент, fileName, title и type обязательны",
      });
    }

    const file = await Files.findOne({ where: { name: fileName } });

    if (!file) {
      return res.status(404).json({ message: "Файл не найден" });
    }

const noteData = {
  content: type === "private" ? encrypt(content) : content,
  fileName: type === "private" ? encrypt(fileName) : fileName,
  title: type === "private" ? encrypt(title) : title,
  fileId: file.id,
  type,
  ...(type === "private" && { password: await bcrypt.hash(password, 15) }),
};


    const note = await Notes.create(noteData);

    const types = await Notes.findAll({
      attributes: ["type"],
      group: ["type"],
      raw: true,
    });

    const uniqueTypes = types.map((t) => t.type);

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ event: "create_note", note }));
        client.send(
          JSON.stringify({ event: "types_userUsed", types: uniqueTypes }),
        );
      }
    });

    res.status(201).json(note);
  } catch (error) {
    console.error("Ошибка создания заметки:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
