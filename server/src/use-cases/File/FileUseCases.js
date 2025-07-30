const FILE_NOT_FOUND = 'FILE NOT FOUND';

export class FileUseCases {
  constructor(fileRepository) {
    this.fileRepository = fileRepository;
  }

  async saveNote(fileId, userId, status) {
    try {
      const file = await this.fileRepository.findOne(fileId, userId);
      if (!file) {
        throw new Error(FILE_NOT_FOUND);
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

  async createFile(name, description, userId, status = 'active') {
    try {
      if (!name || !userId || !description) {
        throw new Error('Name, userId, description are required');
      }

      const fileData = { name, description, userId, status };
      const newFile = await this.fileRepository.create(fileData);
      return newFile;
    } catch (error) {
      console.error('Error creating file:', error);
      throw new Error('Error creating file: ' + error.message);
    }
  }

  async deleteFile(fileId, userId) {
    try {
      if (!fileId) {
        throw new Error('fileId is required');
      }
      const file = await this.fileRepository.findOne(fileId, userId);
      if (!file) {
        throw new Error(FILE_NOT_FOUND);
      }

      await file.destroy();
      return file;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new Error('Error deleting file: ' + error.message);
    }
  }
}
