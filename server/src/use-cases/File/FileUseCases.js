const FILE_NOT_FOUND = 'FILE NOT FOUND';
const USER_NOT_FOUND = 'USER NOT FOUND';

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

  async findAllUserFiles(userId) {
    try {
      if (!userId) {
        throw new Error(USER_NOT_FOUND);
      }

      const files = await this.fileRepository.findAll(userId);
      return files;
    } catch (error) {
      console.error('Error finding all user files:', error);
      throw new Error('Error finding all user files: ' + error.message);
    }
  }

  async findFilesByStatus(userId, status, limit, page, pinned) {
    try {
      if (!userId) {
        throw new Error(USER_NOT_FOUND);
      }

      if (typeof status !== 'string') {
        throw new Error('Status is required and must be a string');
      }

      const offset = (page - 1) * limit;

      const files = await this.fileRepository.findAndCountAll(
        userId,
        status,
        limit,
        offset,
        pinned
      );

      const totalPages = Math.ceil(files.count / limit);
      return { files, totalPages };
    } catch (error) {
      console.error('Error finding files by status:', error);
      throw new Error('Error finding files by status: ' + error.message);
    }
  }

  async getFilesByName(userId, status, attributes = ['name']) {
    try {
      if (!userId) {
        throw new Error(USER_NOT_FOUND);
      }

      if (!status) {
        throw new Error('Status is required');
      }

      const files = await this.fileRepository.findByName(userId, status, attributes);
      return files;
    } catch (error) {
      console.error('Error getting files by name:', error);
      throw new Error('Error getting files by name: ' + error.message);
    }
  }
}
