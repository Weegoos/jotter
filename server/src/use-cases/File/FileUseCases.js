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

  async pinFile(fileId, userId, value) {
    try {
      const file = await this.fileRepository.findOne(fileId, userId);
      if (value === undefined) {
        throw new Error('Value is required');
      }
      if (!file) {
        throw new Error('FILE NOT FOUND');
      }

      file.pinned = value;
      await file.save();
      return file;
    } catch (error) {
      console.error('Error pinning file:', error);
      throw new Error('Error pinning file: ' + error.message);
    }
  }
}
