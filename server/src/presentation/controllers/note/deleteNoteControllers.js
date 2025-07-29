import { wssSend } from '../wssSend.js';

export class DeleteNoteByIdController{
  constructor(deleteNoteUseCase) {
    this.deleteNoteUseCase = deleteNoteUseCase;
  }

  async handle(req, res) {
    try {
      const { noteId } = req.params;

      if (!noteId) {
        return res.status(400).json({ message: 'noteId обязателен.' });
      }

      const { note, uniqueTypes } = await this.deleteNoteUseCase.execute(noteId);

      wssSend('delete_note', note);
      wssSend('types_userUsed', uniqueTypes);

      return res.status(200).json({
        message: 'Заметка успешно удалена.',
        note,
        types: uniqueTypes,
      });
    } catch (error) {
      console.error('Ошибка удаления заметки:', error);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}