// import { Op } from 'sequelize';
// import Notes from '../../../infrastructure/database/models/notesSchemas.js';
import { wssSend } from '../wssSend.js';

export class GetNotesByFileIdController {
  constructor(getNoteUseCase) {
    this.getNoteUseCase = getNoteUseCase;
  }

  async handle(req, res) {
    try {
      const { id: userId } = req.user;
      const { fileId, pinned } = req.params;

      if (!fileId || pinned === undefined) {
        return res.status(400).json({ message: 'fileId и pinned обязательны' });
      }

      const notes = await this.getNoteUseCase.getAllByFileId(fileId, pinned, userId);

      wssSend('allNotes', notes);
      return res.status(200).json(notes);
    } catch (error) {
      console.error('Ошибка получения заметок:', error);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}
export class GetNoteByIdController {
  constructor(getNoteByIdUseCase) {
    this.getNoteByIdUseCase = getNoteByIdUseCase;
  }

  async handle(req, res) {
    try {
      const userId = req.user.id;
      const noteId = Number(req.params.noteId);
      const { password } = req.query;

      if (!noteId) {
        return res.status(400).json({ message: 'noteId обязателен.' });
      }

      const note = await this.getNoteByIdUseCase.execute(noteId, userId, password);
      wssSend('noteData', note);

      return res.status(200).json(note);
    } catch (error) {
      console.error('Ошибка получения заметки:', error);

      if (error.message === 'NOT_FOUND') {
        return res.status(404).json({ message: 'Заметка не найдена.' });
      }

      if (error.message === 'PASSWORD_REQUIRED') {
        return res.status(400).json({ message: 'Пароль обязателен.' });
      }

      if (error.message === 'INVALID_PASSWORD') {
        return res.status(403).json({ message: 'Неверный пароль.' });
      }

      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}

export class GetAllNotesByTypeController {
  constructor(getNoteByIdUseCase) {
    this.getNoteByIdUseCase = getNoteByIdUseCase;
  }

  async handle(req, res) {
    try {
      const userId = req.user.id;
      const { type } = req.params;

      if (!type) {
        res.status(400).json({ message: 'Укажите тип' });
      }

      const notes = await this.getNoteByIdUseCase.getByType(userId, type);
      return res.status(200).json(notes);
    } catch (error) {
      console.error('Ошибка при получении публичных заметок:', error);
      if (error.message === 'NOT_FOUND') {
        return res.status(404).json({ message: 'Заметка не найдена.' });
      }
      res.status(500).json({ message: 'Ошибка сервера при получении заметок' });
    }
  }
}

export class SearchNotesController {
  constructor(searchNotesUseCase) {
    this.searchNotesUseCase = searchNotesUseCase;
  }

  async handle(req, res) {
    try {
      const { id } = req.user;

      if (!id) {
        return res.status(400).json({ message: 'Ошибка: id отсутствует.' });
      }

      const { fileId } = req.params;
      const { search } = req.query;

      if (!fileId) {
        return res.status(400).json({ message: 'Ошибка: fileId отсутствует.' });
      }

      if (!search) {
        return res.status(400).json({ message: 'Ошибка: search отсутствует.' });
      }
      const cleanedTitle = search.trim();

      const notes = await this.searchNotesUseCase.searchNotes(id, fileId, cleanedTitle);

      return res.status(200).json({ notes });
    } catch (error) {
      console.error('Ошибка при получении заметок поиска:', error);
      return res.status(500).json({ message: 'Ошибка сервера при получении заметок' });
    }
  }
}