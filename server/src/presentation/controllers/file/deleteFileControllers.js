
import Files from '../../../infrastructure/database/models/fileSchemas.js';
import { wss } from '../../../server.js';
import { WebSocket } from 'ws';

export const deleteFileById = async (req, res) => {
  try {
    const { fileId } = req.params;

    if (!fileId) {
      return res.status(400).json({ message: 'Ошибка: fileId отсутствует.' });
    }

    const file = await Files.findByPk(fileId);
    if (!file) {
      return res.status(404).json({ message: 'Файл не найден.' });
    }

    await file.destroy();

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            event: 'deleteFileByID',
            file: file,
          })
        );
      }
    });
    res.status(200).json({ message: 'Файл успешно удален.' });
  } catch (error) {
    console.error('Ошибка при удалении файла:', error);
    res.status(500).json({ message: 'Ошибка сервера.' });
  }
};

export const deleteAllFiles = async (req, res) => {
  try {
    await Files.destroy({ where: {} });
    res.status(200).json({ message: 'Все файлы успешно удалены.' });
  } catch (error) {
    console.error('Ошибка при удалении всех файлов:', error);
    res.status(500).json({ message: 'Ошибка сервера.' });
  }
};
