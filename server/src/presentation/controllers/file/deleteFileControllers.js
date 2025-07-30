import Files from '../../../infrastructure/database/models/fileSchemas.js';
import { wssSend } from '../wssSend.js';

export class DeleteFileByIDController {
  constructor(fileUseCases) {
    this.fileUseCases = fileUseCases;
  }

  async delete(req, res) {
    try {
      const { fileId } = req.params;

      if (!fileId) {
        return res.status(400).json({ message: 'Ошибка: fileId отсутствует.' });
      }

      console.log(req.user.id);

      const file = await this.fileUseCases.deleteFile(fileId, req.user.id);

      wssSend('deleteFileByID', { file });

      res.status(200).json({ message: 'Файл успешно удален.', file });
    } catch (error) {
      if (error.message.includes('FILE NOT FOUND')) {
        return res.status(404).json({ message: 'Файл не найден или доступ запрещен.' });
      }
      if (error.message.includes('fileId is required')) {
        return res.status(400).json({ message: 'Ошибка: fileId is required.' });
      }
      console.error('Ошибка при удалении файла:', error);
      res.status(500).json({ message: 'Ошибка сервера.' });
    }
  }
}

export const deleteAllFiles = async (req, res) => {
  try {
    await Files.destroy({ where: {} });
    res.status(200).json({ message: 'Все файлы успешно удалены.' });
  } catch (error) {
    console.error('Ошибка при удалении всех файлов:', error);
    res.status(500).json({ message: 'Ошибка сервера.' });
  }
};
