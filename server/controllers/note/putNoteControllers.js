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
