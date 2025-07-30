export class FileUseCases {
  constructor(fileRepository) {
    this.fileRepository = fileRepository;
  }

  async saveNote(fileId, userId, status) {
    try {
      const file = await this.fileRepository.findOne(fileId, userId);
      if (!file) {
        throw new Error('FILE NOT FOUND');
      }

      file.status = status;
      await file.save();
      return file;
    } catch (error) {
      console.error('Error saving note:', error);
      throw new Error('Error saving note: ' + error.message);
    }
  }
}
