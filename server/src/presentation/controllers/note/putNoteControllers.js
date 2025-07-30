import Files from '../../../infrastructure/database/models/fileSchemas.js';
import Notes from '../../../infrastructure/database/models/notesSchemas.js';
import { wss } from '../../../server.js';
import { wssSend } from '../wssSend.js';

export class UpdateNoteController {
  constructor(updateNoteUseCase) {
    this.updateNoteUseCase = updateNoteUseCase;
  }

  async handle(req, res) {
    try {
      const { noteId } = req.params;
      const { content, title, type } = req.body;

      if (!content || !title || !type) {
        return res.status(400).json({ message: 'Все поля обязательны' });
      }

      console.log(req.user.id);

      const updatedNote = await this.updateNoteUseCase.execute(
        noteId,
        content,
        title,
        type,
        req.user.id
      );

      wssSend('notes_list', {
        fileId: updatedNote.fileId,
        note: updatedNote,
      });

      return res.status(200).json(updatedNote);
    } catch (error) {
      console.error('Ошибка обновления заметки:', error);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}

export class PinNoteController {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async pin(req, res) {
    try {
      const userId = req.user.id;
      const { noteId } = req.params;
      const { value } = req.body;
      const note = await this.noteRepository.pinNote(noteId, value, userId);
      if (!note) {
        throw new Error('Note not found');
      }

      wssSend('notes_list', {
        fileId: note.fileId,
        note: note,
      });

      return res.json({ message: 'Статус pinned обновлён', note });
    } catch (error) {
      console.error('Ошибка обновления заметки:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}

export const pinNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { noteId } = req.params;
    const { value } = req.body;

    if (value === undefined) {
      return res.status(400).json({ message: 'Все поля обязательный' });
    }

    const note = await Notes.findOne({
      where: {
        id: noteId,
      },
      include: [
        {
          model: Files,
          where: { userId },
          attributes: [],
        },
      ],
    });

    if (!note) {
      return res.status(404).json({ message: 'Заметка не найдена или доступ запрещен' });
    }

    note.pinned = value;
    await note.save();

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(
          JSON.stringify({
            event: 'notes_list',
            fileId: note.fileId,
            note,
          })
        );
      }
    });

    return res.json({ message: 'Статус pinned обновлён', note });
  } catch (error) {
    console.error('Ошибка обновления заметки:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
