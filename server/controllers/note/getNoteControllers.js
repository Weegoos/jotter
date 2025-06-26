import Files from "../../schemas/fileSchemas.js";
import Notes from "../../schemas/notesSchemas.js";
import { wss } from "../../server.js";
import bcrypt from "bcrypt";
import { decrypt } from "../crypto.js";
import { Op } from "sequelize";

export const getAllNotesByFileID = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fileId, pinned } = req.params;

    if (!fileId && !pinned) {
      return res
        .status(400)
        .json({ message: "Ошибка: fileID и pinned отсутствует." });
    }

    const file = await Files.findOne({
      where: { id: fileId, userId: userId },
    });

    if (!file) {
      return res
        .status(403)
        .json({ message: "Доступ запрещен или файл не найден." });
    }

    const notes = await Notes.findAll({
      where: { fileId: fileId, pinned: pinned },
      order: [
        ["updatedAt", "DESC"],
        ["createdAt", "DESC"],
      ],
    });

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ event: "allNotes", fileId, notes }));
      }
    });

    res.json(notes);
  } catch (error) {
    console.error("Ошибка получения заметок:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const getNoteByID = async (req, res) => {
  try {
    const userId = req.user.id;
    const noteId = Number(req.params.noteId);
    const { password } = req.query;

    if (!noteId) {
      return res.status(400).json({ message: "Ошибка: noteId отсутствует." });
    }

    const note = await Notes.findOne({
      where: { id: noteId },
      include: [
        {
          model: Files,
          where: { userId: userId },
          attributes: [],
        },
      ],
    });

    if (!note) {
      return res.status(404).json({ message: "Заметка не найдена." });
    }

    if (note.type === "private") {
      if (!password) {
        return res
          .status(400)
          .json({
            message: "Требуется пароль для доступа к приватной заметке.",
          });
      }

      const isMatch = await bcrypt.compare(password, note.password);
      if (!isMatch) {
        return res.status(403).json({ message: "Неверный пароль." });
      }

      // Расшифровка данных
      note.content = decrypt(note.content);
      note.fileName = decrypt(note.fileName);
      note.title = decrypt(note.title);
    }

    // WebSocket рассылка
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ event: "note_data", note }));
      }
    });

    res.json(note);
  } catch (error) {
    console.error("Ошибка получения заметки:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const getAllNotesByType = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type } = req.params;

    if (!type) {
      res.status(400).json({ message: "Укажите тип" });
    }

    const notes = await Notes.findAll({
      where: { type: type },
      include: [
        {
          model: Files,
          where: { userId: userId },
          attributes: [],
        },
      ],
      order: [
        ["updatedAt", "DESC"],
        ["createdAt", "DESC"],
      ],
    });

    res.status(200).json(notes);
  } catch (error) {
    console.error("Ошибка при получении публичных заметок:", error);
    res.status(500).json({ message: "Ошибка сервера при получении заметок" });
  }
};

export const searchNotes = async (req, res) => {
  try {
    const { id } = req.user;

    if (!id) {
      return res.status(400).json({ message: "Ошибка: id отсутствует." });
    }

    const { fileId } = req.params;
    const { search } = req.query;
    if (!fileId) {
      return res
        .status(400)
        .json({ message: "Ошибка: fileId отсутствует." });
    }

        if (!search) {
      return res
        .status(400)
        .json({ message: "Ошибка: search отсутствует." });
    }

    const cleanedTitle = search.trim()
    const notes = await Notes.findAll({
      where: {
        fileId: fileId,
        [Op.or]: [
          { title: { [Op.like]: `%${cleanedTitle}%` } },
          { content: { [Op.like]: `%${cleanedTitle}%` } },
        ]
      }
    })
    console.log(cleanedTitle);
    
    return res.status(200).json({ notes });
  } catch (error) {
    console.error("Ошибка при получении заметок поиска:", error);
    return res.status(500).json({ message: "Ошибка сервера при получении заметок" });
  }
};
