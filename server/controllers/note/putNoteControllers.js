import Files from "../../schemas/fileSchemas.js";
import Notes from "../../schemas/notesSchemas.js";
import { wss } from "../../server.js";

export const updateNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { content, title, type } = req.body;

    if (!content || !title || !type) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const note = await Notes.findByPk(noteId);
    if (!note) {
      return res.status(404).json({ message: "Заметка не найдена" });
    }

    note.content = content;
    note.title = title;
    note.type = type;
    await note.save();

    // 🔥 Запрашиваем обновленный список заметок
    const notes = await Notes.findAll({ where: { fileId: note.fileId } });

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(
          JSON.stringify({
            event: "notes_list",
            fileId: note.fileId,
            notes,
          }),
        );
      }
    });

    res.json(note);
  } catch (error) {
    console.error("Ошибка обновления заметки:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const pinNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { noteId } = req.params;
    const { value } = req.body;

    if (value === undefined) {
      return res.status(400).json({ message: "Все поля обязательный" });
    }

    const userFile = await Files.findByPk(userId);

    if (!userFile) {
      return res.status(403).json({ message: "Файл пользователя не найден" });
    }

    const note = await Notes.findOne({
      where: {
        fileId: userFile.id,
        id: noteId,
      },
    });

    if (!note) {
      return res
        .status(404)
        .json({ message: "Заметка не найдена или доступ запрещен" });
    }

    note.pinned = value;
    await note.save();

    return res.json({ message: "Статус pinned обновлён", note });
  } catch (error) {
    console.error("Ошибка обновления заметки:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
